import CheckAccountsAndBringTheData from '@application/usecase/check-accounts-and-bring-the-data/check-accounts-and-bring-the-data'
import RedisCacheAdpter from '@infra/adpters/redis-cache-adpter'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeCheckAccountsAndBringTheDataFactory = (): CheckAccountsAndBringTheData => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const cache = new RedisCacheAdpter()
	const pixKeyRepositoryTypeOrm = new AccountRepositoryTypeOrm(databaseconnection)
	return new CheckAccountsAndBringTheData(pixKeyRepositoryTypeOrm,cache,environment.CACHE_EXPIRATION_TIME_IN_SECONDS)
}