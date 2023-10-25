import { GetAccountController } from '@presentation/controllers/get-account'
import { WebController } from '../web-controller'
import { MakeGetAccount } from '@main/factories/get-account-factory'

export const makeGetAccountController = (): WebController => {
	const getAccount = MakeGetAccount()
	const controller = new WebController(new GetAccountController(getAccount))
	return controller
}