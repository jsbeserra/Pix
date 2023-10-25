import { WebController } from '../web-controller'
import { GetAccountController } from '@presentation/controllers/get-account'
import { MakeGetAccountFactory } from '@main/factories/make-get-account--factory'


export const MakeGetAccountController = (): WebController => {
	const getAccount = MakeGetAccountFactory()
	const controller = new WebController(new GetAccountController(getAccount))
	return controller
}