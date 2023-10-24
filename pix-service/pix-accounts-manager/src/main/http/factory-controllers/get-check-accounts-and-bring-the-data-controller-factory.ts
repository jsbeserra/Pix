import { WebController } from '../web-controller'
import { CheckAccountsAndBringTheDataAccountController } from '../controllers/check-accounts-and-bring-the-data'
import { MakeCheckAccountsAndBringTheDataFactory } from '@main/factories/make-check-accounts-and-bring-the-data-factory'


export const MakeCheckAccountsAndBringTheDataAccountController = (): WebController => {
	const getAccount = MakeCheckAccountsAndBringTheDataFactory()
	const controller = new WebController(new CheckAccountsAndBringTheDataAccountController(getAccount))
	return controller
}