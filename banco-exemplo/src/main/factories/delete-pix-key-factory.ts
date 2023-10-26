import DeletePixKey from '@application/command/delete-pix-key/delete-pix-key'
import AccountRepositoryPostgreTypeorm from '@infra/data/Accout-repository-typeorm'
import PixGateway from '@infra/geteway/get-account-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeDeletePixKey = (): DeletePixKey => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgreTypeorm(databaseconnection)
	const axiosClient = new AxiosAdapter(environment.PIX_ACCOUNTS_API_URL!)
	const pixGateway = new PixGateway(axiosClient)
	return new DeletePixKey(repository,pixGateway)
}