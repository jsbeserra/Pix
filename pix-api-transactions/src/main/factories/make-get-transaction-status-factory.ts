
import GetTransactionStatus from '@application/use-case/get-transaction-status/get-transaction-status'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeGetTransactionFactory = (): GetTransactionStatus => {
	const typeormAdpter = TypeOrmHelperAdpterPostgress.instance()
	const transactionRepository = new TransactionRepositoryTypeOrm(typeormAdpter)
	return new GetTransactionStatus(transactionRepository)
}