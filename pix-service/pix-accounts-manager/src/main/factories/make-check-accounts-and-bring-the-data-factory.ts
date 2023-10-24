import CheckAccountsAndBringTheData from '@application/query/check-accounts-and-bring-the-data/check-accounts-and-bring-the-data'
import RedisCache from '@infra/cache/redis-cache'
import AccountQuery from '@infra/query/get-account-query'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeCheckAccountsAndBringTheDataFactory = (): CheckAccountsAndBringTheData => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const cache = new RedisCache()
	const query = new AccountQuery(databaseconnection)
	return new CheckAccountsAndBringTheData(query,cache,environment.CACHE_EXPIRATION_TIME_IN_SECONDS)
}