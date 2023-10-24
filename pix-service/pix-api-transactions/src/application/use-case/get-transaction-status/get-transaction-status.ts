import { ApplicationHandle } from '@application/application-handle'
import { TransactionNotFound } from '@application/errors/application-shared-errors'
import { ITransactionRepository } from '@application/interfaces/repository/transaction-repository'


export default class GetTransactionStatus implements ApplicationHandle {

	constructor(private transactionRepository:ITransactionRepository){}

	async handle(code:string): Promise<{status:string}> {
		const transaction = await this.transactionRepository.get(code)
		if (!transaction) throw new TransactionNotFound()
		return {status:transaction.status}
	}
}