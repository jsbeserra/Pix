import CreateAccountBank from '@application/command/create-account-bank/create-account-bank'
import BankRepositoryTypeOrm from '@infra/repository/bank-repository-typeorm'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeCreateAccountBankFactory = (): CreateAccountBank => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const bankRepository = new BankRepositoryTypeOrm(databaseconnection)
	return new CreateAccountBank(bankRepository)
}