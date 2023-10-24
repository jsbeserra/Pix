
import { WebController } from '../web-controller'
import { MakeTransactionFactory } from '@main/factories/make-transaction-factory'
import { TransactionController } from '../controllers/transaction-controller'

export const makeTransactionController = (): WebController => {
	const createAccountCommand = MakeTransactionFactory()
	const controller = new WebController(new TransactionController(createAccountCommand))
	return controller
}