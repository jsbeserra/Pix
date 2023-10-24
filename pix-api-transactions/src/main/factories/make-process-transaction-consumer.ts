import { IQueue } from '@application/interfaces/queue/queue'
import ProcessTransaction from '@application/use-case/process-transaction/register-transaction'
import ProcessTransactionGateway from '@infra/gateway/process-transaction-gateway'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'
import AxiosAdapter from '@main/http/axios/http-axios-adpter'


export const makeProcessTransactionConsumer = async (queue:IQueue) => {
	const httpclient = new AxiosAdapter('')
	const typeormAdpter = TypeOrmHelperAdpterPostgress.instance()
	const transactionRepository = new TransactionRepositoryTypeOrm(typeormAdpter)
	const gateway = new ProcessTransactionGateway(httpclient)
	const transaction = new ProcessTransaction(gateway,transactionRepository)
	queue.consumer('transactions',transaction)
}