import { WebController } from '../web-controller'
import { MakeDeleteAccount } from '@main/factories/delete-account-factory'
import { DeleteAccountController } from '@presentation/controllers/delete-account'


export const makeDeleteAccountController = (): WebController => {
	const deleteAccount = MakeDeleteAccount()
	const controller = new WebController(new DeleteAccountController(deleteAccount))
	return controller
}