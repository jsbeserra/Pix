import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeTransactionController } from '../factory-controllers/transaction-controller-factory'


export default (router: Router): void => {
	router.post('/transaction/pix', adaptRoute(makeTransactionController())) 	
}