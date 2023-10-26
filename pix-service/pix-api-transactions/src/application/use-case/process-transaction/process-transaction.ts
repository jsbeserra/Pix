import { payloadTransactionQueue } from '@application/dto/TransactionDto'
import { IProcessTransactionGateway } from '@application/interfaces/gateway/process-transaction'
import { ITransactionRepository } from '@application/interfaces/repository/transaction-repository'
import { usecase } from '@application/usecase'


export default class ProcessTransaction implements usecase<payloadTransactionQueue,void> {

	constructor(private processTransactionGateway:IProcessTransactionGateway,
		private transactionRepository:ITransactionRepository
	){}

	async handle(input:payloadTransactionQueue): Promise<void> {
		try {
			await this.executeTransaction(input)
			await this.transactionRepository.updateStatus(input.code,'success')
		} catch (error) {
			await this.sendRefound(input)
		}	
	}

	private async executeTransaction(input:payloadTransactionQueue): Promise<void> {
		await this.processTransactionGateway.exec(input.receiver.url_for_transaction,{
			payer_cpf:input.payer.cpf,
			receiver_cpf:input.receiver.cpf,
			value:input.value
		})	
	}

	private async sendRefound(input:payloadTransactionQueue): Promise<void> {
		await this.processTransactionGateway.refaund(input.payer.url_for_refund,{
			cpf:input.payer.cpf,
			code:input.code,
			value:input.value
		})
	}
}