import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeCreateAccountController } from '../factory-controllers/create-account-controller-factory'
import { makeDeleteAccountController } from '../factory-controllers/delete-account-controller-factory'
import { MakeGetAccountController } from '../factory-controllers/get-account-controller-factory'
import { MakeCheckAccountsAndBringTheDataAccountController } from '../factory-controllers/get-check-accounts-and-bring-the-data-controller-factory'



export default (router: Router): void => {
	router.post('/create/pix-account', adaptRoute(makeCreateAccountController())) 
	router.delete('/delete/pix-account/:pix_key', adaptRoute(makeDeleteAccountController())) 
	router.get('/get/pix-account/:pix_key', adaptRoute(MakeGetAccountController())) 
	router.get('/get/get-accounts-data/:payer_pix_key/:receiver_pix_key', adaptRoute(MakeCheckAccountsAndBringTheDataAccountController())) 
}