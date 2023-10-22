import { WebController } from '../web-controller'
import { MakeDeleteAccountFactory } from '@main/factories/make-delete-account-factory'
import { DeleteAccountController } from '../controllers/delete-account'

export const makeDeleteAccountController = (): WebController => {
	const deleteAccount = MakeDeleteAccountFactory()
	const controller = new WebController(new DeleteAccountController(deleteAccount))
	return controller
}