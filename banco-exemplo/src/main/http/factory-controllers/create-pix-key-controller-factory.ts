import { CreatePixController } from '../controllers/create-pix-key'
import { WebController } from '../web-controller'
import { MakeCreatePixKey } from '@main/factories/create-pi-key.factory'

export const makeCreatePixKeyController = (): WebController => {
	const createAccountCommand = MakeCreatePixKey()
	const controller = new WebController(new CreatePixController(createAccountCommand))
	return controller
}