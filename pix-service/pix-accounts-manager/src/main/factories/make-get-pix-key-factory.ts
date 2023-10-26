
import GetPixKey from '@application/usecase/get-account/get-account'
import RedisCacheAdpter from '@infra/adpters/redis-cache-adpter'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeGetPixKeyFactory = (): GetPixKey => {
	const databaseconnection = TypeOrmHelperAdpterPostgress.instance()
	const cache = new RedisCacheAdpter()
	const accountRepository = new AccountRepositoryTypeOrm(databaseconnection)
	return new GetPixKey(accountRepository,cache,environment.CACHE_EXPIRATION_TIME_IN_SECONDS)
}