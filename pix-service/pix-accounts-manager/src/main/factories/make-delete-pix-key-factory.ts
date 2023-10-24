import DeletePixKey from '@application/command/delete-pix-key/delete.pix-key'
import RedisCache from '@infra/cache/redis-cache'
import AccountQuery from '@infra/query/get-account-query'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeDeletePixKeyFactory = (): DeletePixKey => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const accountRepository = new AccountRepositoryTypeOrm(databaseconnection)
	const accountQuery = new AccountQuery(databaseconnection)
	const redisCache = new RedisCache()
	return new DeletePixKey(accountQuery,accountRepository,redisCache)
}