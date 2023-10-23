import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeCreateAccountController } from '../factory-controllers/create-account-controller-factory'
import { makeGetAccountController } from '../factory-controllers/get-account-controller-factory'


export default (router: Router): void => {
	router.post('/create/account', adaptRoute(makeCreateAccountController())) 
	router.get('/get/account/:cpf', adaptRoute(makeGetAccountController())) 
}