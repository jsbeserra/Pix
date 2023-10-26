import GetAccount from '@application/query/get-account/get-account'
import QueryAccount from '@infra/data/query/query-account'
import PixGateway from '@infra/geteway/get-account-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeGetAccount = (): GetAccount => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const queryAccount = new QueryAccount(databaseconnection)
	const axiosClient = new AxiosAdapter(environment.PIX_ACCOUNTS_API_URL!)
	const pixGateway = new PixGateway(axiosClient)
	return new GetAccount(queryAccount,pixGateway)
}