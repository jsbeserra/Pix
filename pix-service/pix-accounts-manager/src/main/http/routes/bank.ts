import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeCreateAccountBankController } from '../factory-controllers/create-bank-controller-factory'


export default (router: Router): void => {
	router.post('/bank/account/create', adaptRoute(makeCreateAccountBankController())) 
}