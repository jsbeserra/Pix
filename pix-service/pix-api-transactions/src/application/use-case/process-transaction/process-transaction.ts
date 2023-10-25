import { ApplicationHandle } from '@application/application-handle'
import { payloadTransactionQueue } from '@application/dto/TransactionDto'
import { IProcessTransactionGateway } from '@application/interfaces/gateway/process-transaction'
import { ITransactionRepository } from '@application/interfaces/repository/transaction-repository'


export default class ProcessTransaction implements ApplicationHandle {

	constructor(private processTransactionGateway:IProcessTransactionGateway,
		private transactionRepository:ITransactionRepository
	){}

	async handle(input:payloadTransactionQueue): Promise<void> {
		const payload:payloadTransactionQueue = input
		try {
			await this.processTransactionGateway.exec(payload.receiver.url_for_transaction,{
				payer_cpf:payload.payer.cpf,
				receiver_cpf:payload.receiver.cpf,
				value:payload.value
			})
			await this.transactionRepository.updateStatus(payload.code,'success')
		} catch (error) {
			throw new Error(error.message)
		}	
	}
}