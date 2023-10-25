
import { TransactionController } from '@presentation/controllers/transaction-controller'
import { WebController } from '../../infra/http/web-controller'
import { MakeTransactionFactory } from '@main/factories/make-transaction-factory'

export const makeTransactionController = (): WebController => {
	const createAccountCommand = MakeTransactionFactory()
	const controller = new WebController(new TransactionController(createAccountCommand))
	return controller
}