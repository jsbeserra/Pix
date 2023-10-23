import { CreatePixController } from '../controllers/create-pix-key'
import { WebController } from '../web-controller'
import { MakeCreatePixKey } from '@main/factories/create-pix-key-factory'

export const makeCreatePixKeyController = (): WebController => {
	const createPixKey = MakeCreatePixKey()
	const controller = new WebController(new CreatePixController(createPixKey))
	return controller
}