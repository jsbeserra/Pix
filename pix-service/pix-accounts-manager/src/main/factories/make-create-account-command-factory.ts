import CreateAccount from '@application/command/create-account/create-account'
import CreateAccountCommand from '@application/command/create-account/create-account'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import BankRepositoryTypeOrm from '@infra/repository/bank-repository-typeorm'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeCreateAccountCommandFactory = (): CreateAccountCommand => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const accountRepository = new AccountRepositoryTypeOrm(databaseconnection)
	const bankRepository = new BankRepositoryTypeOrm(databaseconnection)
	return new CreateAccount(accountRepository,bankRepository)
}