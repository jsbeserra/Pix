import { GetAccountController } from '../controllers/get-account'
import { WebController } from '../web-controller'
import { MakeGetAccount } from '@main/factories/get-account-factory'

export const makeGetAccountController = (): WebController => {
	const createAccountCommand = MakeGetAccount()
	const controller = new WebController(new GetAccountController(createAccountCommand))
	return controller
}