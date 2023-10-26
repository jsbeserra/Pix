import RefundTransactionPix from '@application/command/refund-transaction-pix/ refund-transaction-pix'
import AccountRepositoryPostgreTypeorm from '@infra/data/Accout-repository-typeorm'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const makeRefundTransactionPix = (): RefundTransactionPix => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgreTypeorm(databaseconnection)
	return new RefundTransactionPix(repository)
}