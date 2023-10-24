import CreateAccount from '@application/command/create-account/create-account'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'



export const MakeCreateAccountCommand = (): CreateAccount => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	return new CreateAccount(repository)
}