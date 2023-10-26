import { GetPixKeyController } from '@presentation/controllers/get-account'
import { WebController } from '../web-controller'
import { MakeGetPixKeyFactory } from '@main/factories/make-get-pix-key-factory'


export const MakeGetPixKeyController = (): WebController => {
	const getPixKey = MakeGetPixKeyFactory()
	const controller = new WebController(new GetPixKeyController(getPixKey))
	return controller
}