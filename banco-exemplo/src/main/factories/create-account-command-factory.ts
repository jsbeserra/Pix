import CreateAccountCommand from '@application/command/create-account/create-account'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import { environment } from '@main/config/config'
import KnexAdpterPostgresql from '@main/data-base/knex/adpters/knex-adpter-postgresql'


export const MakeCreateAccountCommand = (): CreateAccountCommand => {
	const databaseconnection = new KnexAdpterPostgresql(environment.mode!)
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	return new CreateAccountCommand(repository)
}