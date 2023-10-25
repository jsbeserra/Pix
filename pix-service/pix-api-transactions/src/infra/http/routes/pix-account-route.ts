import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeTransactionController } from '../../../main/factory-controllers/make-transaction-controller-factory'
import { makeGetTransactionStatusController } from '../../../main/factory-controllers/make-get-transaction-controller-factory'

export default (router: Router): void => {
	router.get('/transaction/status/:code', adaptRoute(makeGetTransactionStatusController())) 
	router.post('/transaction', adaptRoute(makeTransactionController())) 
}