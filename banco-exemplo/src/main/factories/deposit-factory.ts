import Deposit from '@application/command/deposit/deposit'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'

export const MakeDeposit = (): Deposit => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	return new Deposit(repository)
}