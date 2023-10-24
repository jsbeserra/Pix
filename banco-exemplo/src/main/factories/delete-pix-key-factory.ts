import DeletePixKey from '@application/command/delete-pix-key/delete-pix-key'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import QueryAccount from '@infra/data/query/query-account'
import PixGateway from '@infra/geteway/get-account-gateway'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'
import AxiosAdapter from '@main/http/axios-client/http-axios-adpter'


export const MakeDeletePixKey = (): DeletePixKey => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	const queryAccount = new QueryAccount(databaseconnection)
	const axiosClient = new AxiosAdapter(environment.PIX_API_URL!)
	const pixGateway = new PixGateway(axiosClient)
	return new DeletePixKey(repository,pixGateway,queryAccount)
}