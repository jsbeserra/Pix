import { usecase } from '@application/usecase'
import { TransactionNotFound } from '@application/errors/application-shared-errors'
import { ITransactionRepository } from '@application/interfaces/repository/transaction-repository'
import { OutputTransaction } from './output-transaction'


export default class GetTransactionStatus implements usecase<string,OutputTransaction> {

	constructor(private transactionRepository:ITransactionRepository){}

	async handle(code:string): Promise<OutputTransaction> {
		const transaction = await this.transactionRepository.get(code)
		if (!transaction) throw new TransactionNotFound()
		return {status:transaction.status}
	}
}