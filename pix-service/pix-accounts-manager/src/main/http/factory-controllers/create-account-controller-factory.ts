
import { MakeCreateAccountCommandFactory } from '@main/factories/make-create-account-command-factory'
import { CreateAccountController } from '../controllers/create-account'
import { WebController } from '../web-controller'

export const makeCreateAccountController = (): WebController => {
	const createAccountCommand = MakeCreateAccountCommandFactory()
	const controller = new WebController(new CreateAccountController(createAccountCommand))
	return controller
}