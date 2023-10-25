import { DepositController } from '@presentation/controllers/deposit-controller'
import { WebController } from '../web-controller'
import { MakeDeposit } from '@main/factories/deposit-factory'

export const makeDepositController = (): WebController => {
	const createDeposit = MakeDeposit()
	const controller = new WebController(new DepositController(createDeposit))
	return controller
}