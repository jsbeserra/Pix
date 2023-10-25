import { WebController } from '../web-controller'
import { makeRefundTransactionPix } from '@main/factories/refund-transaction-pix-factory'
import { FaildTransactionPixController } from '@presentation/controllers/refund-transaction-pix'


export const makeRefundTransactionController = (): WebController => {
	const transaction = makeRefundTransactionPix()
	const controller = new WebController(new FaildTransactionPixController(transaction))
	return controller
}