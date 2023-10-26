import Deposit from '@application/command/deposit/deposit'
import AccountRepositoryPostgreTypeorm from '@infra/data/Accout-repository-typeorm'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'

export const MakeDeposit = (): Deposit => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgreTypeorm(databaseconnection)
	return new Deposit(repository)
}