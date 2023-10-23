import { MakeCreateAccountCommand } from '@main/factories/create-account-command-factory'
import { CreateAccountController } from '../controllers/create-account'
import { WebController } from '../web-controller'

export const makeCreateAccountController = (): WebController => {
	const createAccount = MakeCreateAccountCommand()
	const controller = new WebController(new CreateAccountController(createAccount))
	return controller
}