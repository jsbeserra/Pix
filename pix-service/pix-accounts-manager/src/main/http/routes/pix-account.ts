import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeCreatePixKeyController } from '../factory-controllers/create-pix-key-controller-factory'
import { makeDeleteAccountController } from '../factory-controllers/delete-account-controller-factory'
import { MakeGetAccountController } from '../factory-controllers/get-account-controller-factory'
import { MakeCheckAccountsAndBringTheDataAccountController } from '../factory-controllers/get-check-accounts-and-bring-the-data-controller-factory'



export default (router: Router): void => {
	router.post('/pixkey', adaptRoute(makeCreatePixKeyController())) 
	router.delete('/pixkey/:pix_key', adaptRoute(makeDeleteAccountController())) 
	router.get('/pixkey/details/:pix_key', adaptRoute(MakeGetAccountController())) 
	router.get('/pixkey/two/details/:payer_pix_key/:receiver_pix_key',adaptRoute(MakeCheckAccountsAndBringTheDataAccountController())) 
}