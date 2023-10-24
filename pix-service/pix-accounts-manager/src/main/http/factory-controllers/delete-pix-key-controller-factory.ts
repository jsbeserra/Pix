import { WebController } from '../web-controller'
import { DeletePixKeyController } from '../controllers/delete-pix-key'
import { MakeDeletePixKeyFactory } from '@main/factories/make-delete-pix-key-factory'

export const makeDeletePixKeyController = (): WebController => {
	const deleteAccount = MakeDeletePixKeyFactory()
	const controller = new WebController(new DeletePixKeyController(deleteAccount))
	return controller
}