import { TransactionController } from '@presentation/controllers/transaction'
import { WebController } from '../web-controller'
import { makeRefundTransactionPix } from '@main/factories/refund-transaction-pix-factory'


export const makeRefundTransactionController = (): WebController => {
	const transaction = makeRefundTransactionPix()
	const controller = new WebController(new TransactionController(transaction))
	return controller
}