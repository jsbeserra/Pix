import { TransactionController } from '../controllers/transaction'
import { WebController } from '../web-controller'
import { MakeTransaction } from '@main/factories/transaction-factory'

export const makeTransactionController = (): WebController => {
	const transaction = MakeTransaction()
	const controller = new WebController(new TransactionController(transaction))
	return controller
}