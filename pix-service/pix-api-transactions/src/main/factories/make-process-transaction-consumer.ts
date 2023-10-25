import { IQueue } from '@application/interfaces/queue/queue'
import ProcessTransaction from '@application/use-case/process-transaction/process-transaction'
import AxiosClientAdapter from '@infra/adpters/http-client-axios-adpter'
import ProcessTransactionGateway from '@infra/gateway/process-transaction-gateway'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import TypeOrmHelperAdpterPostgress from '@main/data-base/typeorm/typeorm-adpter-postgres'


export const makeProcessTransactionConsumer = async (queue:IQueue) => {
	const httpclient = new AxiosClientAdapter('')
	const typeormAdpter = TypeOrmHelperAdpterPostgress.instance()
	const transactionRepository = new TransactionRepositoryTypeOrm(typeormAdpter)
	const gateway = new ProcessTransactionGateway(httpclient)
	const transaction = new ProcessTransaction(gateway,transactionRepository)
	queue.consumer('transactions',transaction)
}