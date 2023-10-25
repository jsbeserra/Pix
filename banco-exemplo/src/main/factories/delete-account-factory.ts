import DeleteAccount from '@application/command/delete-account/delete-account'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-typeorm'
import PixGateway from '@infra/geteway/get-account-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeDeleteAccount = (): DeleteAccount => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	const axiosClient = new AxiosAdapter(environment.PIX_ACCOUNTS_API_URL!)
	const pixGateway = new PixGateway(axiosClient)
	return new DeleteAccount(repository,pixGateway)
}