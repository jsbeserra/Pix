import CreatePixKey from '@application/command/create-pix-key/create-pix-key'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import PixGateway from '@infra/geteway/get-account-gateway'
import { environment } from '@main/config/config'
import KnexAdpterPostgresql from '@main/data-base/knex/adpters/knex-adpter-postgresql'
import AxiosAdapter from '@main/http/axios-client/http-axios-adpter'


export const MakeCreatePixKey = (): CreatePixKey => {
	const databaseconnection = new KnexAdpterPostgresql(environment.mode!)
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	const axiosClient = new AxiosAdapter(environment.PIX_API_URL!)
	const pixGateway = new PixGateway(axiosClient)
	return new CreatePixKey(repository,pixGateway)
}