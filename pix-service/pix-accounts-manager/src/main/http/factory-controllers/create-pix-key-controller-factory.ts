
import { MakeCreatePixKeyCommandFactory } from '@main/factories/make-create-pix-key-command-factory'
import { CreatePixKeyController } from '../controllers/create-pix-key'
import { WebController } from '../web-controller'

export const makeCreatePixKeyController = (): WebController => {
	const createAccountCommand = MakeCreatePixKeyCommandFactory()
	const controller = new WebController(new CreatePixKeyController(createAccountCommand))
	return controller
}