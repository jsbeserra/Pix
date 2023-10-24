
import { WebController } from '../web-controller'
import { GetTransactionController } from '../controllers/get-transaction-status-controller'
import { MakeGetTransactionFactory } from '@main/factories/make-get-transaction-status-factory'

export const makeGetTransactionStatusController = (): WebController => {
	const getTransactionFactory = MakeGetTransactionFactory()
	const controller = new WebController(new GetTransactionController(getTransactionFactory))
	return controller
}