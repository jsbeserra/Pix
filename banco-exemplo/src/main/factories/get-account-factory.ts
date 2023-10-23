import GetAccount from '@application/query/get-account/get-account'
import QueryAccount from '@infra/query/query-account'
import { environment } from '@main/config/config'
import KnexAdpterPostgresql from '@main/data-base/knex/adpters/knex-adpter-postgresql'


export const MakeGetAccount = (): GetAccount => {
	const databaseconnection = new KnexAdpterPostgresql(environment.mode!)
	const queryAccount = new QueryAccount(databaseconnection)
	return new GetAccount(queryAccount)
}