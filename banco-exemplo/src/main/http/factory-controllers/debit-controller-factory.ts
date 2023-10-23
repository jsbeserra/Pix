import { WebController } from '../web-controller'
import { DebitController } from '../controllers/debit-controller'
import { MakeDeposit } from '@main/factories/deposit-factory'

export const makeDebitController = (): WebController => {
	const createDeposit = MakeDeposit()
	const controller = new WebController(new DebitController(createDeposit))
	return controller
}