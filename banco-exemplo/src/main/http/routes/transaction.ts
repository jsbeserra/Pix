import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeTransactionController } from '../factory-controllers/transaction-controller-factory'
import { makeRefundTransactionController } from '../factory-controllers/post-faild-transaction-controller-pix'
import { makeDepositController } from '../factory-controllers/deposit-controller-factory'


export default (router: Router): void => {
	router.post('/transaction/pix', adaptRoute(makeTransactionController())) 
	router.post('/transaction/pix/refund', adaptRoute(makeRefundTransactionController())) 
	router.post('/transaction/pix/deposit', adaptRoute(makeDepositController()))		
}