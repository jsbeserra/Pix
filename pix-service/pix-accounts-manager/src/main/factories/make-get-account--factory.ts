import GetAccount from '@application/query/get-account/get-account'
import RedisCache from '@infra/cache/redis-cache'
import AccountQuery from '@infra/query/get-account-query'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeGetAccountFactory = (): GetAccount => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const cache = new RedisCache()
	const query = new AccountQuery(databaseconnection)
	return new GetAccount(query,cache,environment.CACHE_EXPIRATION_TIME_IN_SECONDS)
}