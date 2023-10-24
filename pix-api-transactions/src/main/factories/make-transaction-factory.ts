
import RegisterTransaction from '@application/use-case/transaction/register-transaction'
import GetAccountGateway from '@infra/gateway/get-account-gateway'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import { environment } from '@main/config/config'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'
import AxiosAdapter from '@main/http/axios/http-axios-adpter'
import AMQPClientAdpter from '@main/queue/amqpclient-queue-adpter'
import UuidApter from '@main/uuid/uuid-adpter'


export const MakeTransactionFactory = (): RegisterTransaction => {
	const typeormAdpter = TypeOrmHelperAdpterPostgress.instance()
	const transactionRepository = new TransactionRepositoryTypeOrm(typeormAdpter)
	const amqpClient = AMQPClientAdpter.getInstance()
	const codegenerator = new UuidApter()
	const httpclient = new AxiosAdapter(environment.PIX_ACCOUNTS_MANAGER_URL!)
	const gatAccountway = new GetAccountGateway(httpclient)
	return new RegisterTransaction(gatAccountway,amqpClient,codegenerator,transactionRepository)
}