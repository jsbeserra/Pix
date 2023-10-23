import Deposit from '@application/command/deposit/deposit'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import { environment } from '@main/config/config'
import KnexAdpterPostgresql from '@main/data-base/knex/adpters/knex-adpter-postgresql'


export const MakeDeposit = (): Deposit => {
	const databaseconnection = new KnexAdpterPostgresql(environment.mode!)
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	return new Deposit(repository)
}