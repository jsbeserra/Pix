import GetAccount from '@application/query/get-account/get-account'
import QueryAccount from '@infra/data/query/query-account'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeGetAccount = (): GetAccount => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const queryAccount = new QueryAccount(databaseconnection)
	return new GetAccount(queryAccount)
}