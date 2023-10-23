import { MakeDeletePixKey } from '@main/factories/delete-pix-key-factory'
import { DeletePixKeyController } from '../controllers/delete-pix-key'
import { WebController } from '../web-controller'


export const makeDeletePixKeyController = (): WebController => {
	const deletePixKey = MakeDeletePixKey()
	const controller = new WebController(new DeletePixKeyController(deletePixKey))
	return controller
}