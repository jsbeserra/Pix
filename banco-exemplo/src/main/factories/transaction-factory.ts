import Transaction from '@application/command/transaction/transaction'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-typeorm'
import PixGateway from '@infra/geteway/get-account-gateway'
import AxiosAdapter from '@infra/http/http-axios-adpter'
import TypeOrmHelperAdpter from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeTransaction = (): Transaction => {
	const databaseconnection = TypeOrmHelperAdpter.instance()
	const repository = new AccountRepositoryPostgresql(databaseconnection)
	const axiosClient = new AxiosAdapter('')
	const pixGateway = new PixGateway(axiosClient)
	return new Transaction(repository,pixGateway)
}