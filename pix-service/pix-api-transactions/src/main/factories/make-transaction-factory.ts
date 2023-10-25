import RegisterTransaction from '@application/use-case/register-transaction/register-transaction'
import AMQPClientAdpter from '@infra/adpters/amqpclient-queue-adpter'
import AxiosClientAdapter from '@infra/adpters/http-client-axios-adpter'
import UuidApter from '@infra/adpters/uuid-adpter'
import GetAccountGateway from '@infra/gateway/get-account-gateway'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const MakeTransactionFactory = (): RegisterTransaction => {
	const typeormAdpter = TypeOrmHelperAdpterPostgress.instance()
	const transactionRepository = new TransactionRepositoryTypeOrm(typeormAdpter)
	const amqpClient = AMQPClientAdpter.getInstance()
	const codegenerator = new UuidApter()
	const httpclient = new AxiosClientAdapter(environment.PIX_ACCOUNTS_MANAGER_URL!)
	const gatAccountway = new GetAccountGateway(httpclient)
	return new RegisterTransaction(gatAccountway,amqpClient,codegenerator,transactionRepository)
}