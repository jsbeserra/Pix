import CreatePixKey from '@application/command/create-pix-key/create-pix-key'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import PixGateway from '@infra/geteway/get-account-gateway'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'
import AxiosAdapter from '@main/http/axios-client/http-axios-adpter'


export const MakeCreatePixKey = (): CreatePixKey => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	const axiosClient = new AxiosAdapter(environment.PIX_ACCOUNTS_API_URL!)
	const pixGateway = new PixGateway(axiosClient)
	return new CreatePixKey(repository,pixGateway)
}