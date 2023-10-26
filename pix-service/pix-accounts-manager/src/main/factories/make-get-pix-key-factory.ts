
import GetPixKey from '@application/usecase/get-account/get-account'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeGetPixKeyFactory = (): GetPixKey => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const accountRepository = new AccountRepositoryTypeOrm(databaseconnection)
	return new GetPixKey(accountRepository)
}