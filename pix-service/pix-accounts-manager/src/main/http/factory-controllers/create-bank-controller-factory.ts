import { CreateAccountBankController } from '@presentation/controllers/create-account-bank'
import { WebController } from '../web-controller'
import { MakeCreateAccountBankFactory } from '@main/factories/make-create-account-bank-factory'

export const makeCreateAccountBankController = (): WebController => {
	const createAccount = MakeCreateAccountBankFactory()
	const controller = new WebController(new CreateAccountBankController(createAccount))
	return controller
}