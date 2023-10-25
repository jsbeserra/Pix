import ICreateCode from '@application/interfaces/create-code'
import { IGatewayAccount } from '@application/interfaces/gateway/account-gateway'
import { IQueue } from '@application/interfaces/queue/queue'
import { InputTransaction } from './input-transaction'
import { ApplicationHandle } from '@application/application-handle'
import { payloadTransactionQueue } from '@application/dto/TransactionDto'
import { OutputTransaction } from './output-transaction'
import Transaction from '@domain/transaction'
import { ITransactionRepository } from '@application/interfaces/repository/transaction-repository'

export default class RegisterTransaction implements ApplicationHandle {

	constructor(private accountGateway:IGatewayAccount,
		private queue:IQueue, private createCode:ICreateCode, 
		private transactionRepository:ITransactionRepository){}

	async handle(input: InputTransaction): Promise<OutputTransaction> {
		console.log(input)
		const accountsData = await this.requestAccountsData(input.payer_pix_key,input.receiver_pix_key)
		console.log(accountsData)
		const code = await this.generateCode()
		const registerPayload:payloadTransactionQueue = {
			code:code,
			value:input.value,
			payer: accountsData.payer,
			receiver: accountsData.receiver
		}
		const transaction = Transaction.create(code, accountsData.payer.pix_key,accountsData.receiver.pix_key,input.value,'pending')
		await this.transactionRepository.save(transaction)
		await this.queue.publish('transactions', registerPayload)
		return {code,status:'pending'}
	}

	private async generateCode(): Promise<string> {
		let code = this.createCode.createCode()
		let exists = true
		while (exists) {
			const transaction = await this.transactionRepository.get(code)
			if (!transaction) exists = false
			code = this.createCode.createCode()
		}
		return code
	}

	private async requestAccountsData(payer_pix_key:string,receiver_pix_key:string) {
		return await this.accountGateway.exec({
			payer_pix_key:payer_pix_key,
			receiver_pix_key:receiver_pix_key
		})
	}

    
}