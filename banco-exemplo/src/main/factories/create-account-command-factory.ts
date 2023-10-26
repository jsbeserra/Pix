import CreateAccount from '@application/command/create-account/create-account'
import AccountRepositoryPostgreTypeorm from '@infra/data/Accout-repository-typeorm'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'



export const MakeCreateAccountCommand = (): CreateAccount => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgreTypeorm(databaseconnection)
	return new CreateAccount(repository)
}