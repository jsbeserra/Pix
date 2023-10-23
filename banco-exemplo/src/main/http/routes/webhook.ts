import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeDebitController } from '../factory-controllers/debit-controller-factory'

export default (router: Router): void => {
	router.post('/webhook/deposit', adaptRoute(makeDebitController())) 	
}