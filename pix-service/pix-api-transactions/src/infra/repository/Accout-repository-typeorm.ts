import { ITransactionRepository } from '@application/interfaces/repository/transaction-repository'
import Transaction from '@domain/transaction'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'


export default class TransactionRepositoryTypeOrm implements ITransactionRepository {

	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}

	async save(transaction: Transaction): Promise<void> {
		console.log(transaction)
		const _transaction = await this.typeormAdpter.getTransactionEntity().create({
			payer_pix_key:transaction.payer_pix_key,
			receiver_pix_key:transaction.receiver_pix_key,
			status:transaction.status,
			value:transaction.value,
			code:transaction.code
		})
		await this.typeormAdpter.getTransactionEntity().save(_transaction)
	}

	async get(code: string): Promise<Transaction | undefined> {
		const transaction = await this.typeormAdpter.getTransactionEntity().findOneBy({code:code})
		if (!transaction) return
		return Transaction.create(transaction.code,transaction.receiver_pix_key,transaction.receiver_pix_key,transaction.value,transaction.status)
	}

	async updateStatus(code: string, status: string): Promise<void> {
		const transaction = await this.typeormAdpter.getTransactionEntity().findOneBy({code:code})
		if (!transaction) throw new Error('Transaction not found')
		transaction.status = status
		await this.typeormAdpter.getTransactionEntity().save(transaction)
	}
    
}