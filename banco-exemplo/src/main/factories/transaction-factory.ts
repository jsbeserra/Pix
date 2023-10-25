import Transaction from '@application/command/transaction/transaction'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import PixGateway from '@infra/geteway/get-account-gateway'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'
import AxiosAdapter from '@main/http/axios-client/http-axios-adpter'


export const MakeTransaction = (): Transaction => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	const axiosClient = new AxiosAdapter('')
	const pixGateway = new PixGateway(axiosClient)
	return new Transaction(repository,pixGateway)
}