import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeTransactionController } from '../factory-controllers/make-transaction-controller-factory'
import { makeGetTransactionStatusController } from '../factory-controllers/make-get-transaction-controller-factory'

export default (router: Router): void => {
	router.post('/transaction', adaptRoute(makeTransactionController())) 
	router.get('/get/transaction/:code', adaptRoute(makeGetTransactionStatusController())) 
}