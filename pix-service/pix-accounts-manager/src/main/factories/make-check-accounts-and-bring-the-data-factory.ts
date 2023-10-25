import CheckAccountsAndBringTheData from '@application/query/check-accounts-and-bring-the-data/check-accounts-and-bring-the-data'
import RedisCacheAdpter from '@infra/adpters/redis-cache-adpter'
import AccountQuery from '@infra/query/get-account-query'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeCheckAccountsAndBringTheDataFactory = (): CheckAccountsAndBringTheData => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const cache = new RedisCacheAdpter()
	const query = new AccountQuery(databaseconnection)
	return new CheckAccountsAndBringTheData(query,cache,environment.CACHE_EXPIRATION_TIME_IN_SECONDS)
}