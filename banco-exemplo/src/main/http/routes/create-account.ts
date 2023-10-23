import { Router } from 'express'
import { adaptRoute } from '../express/express-route-adapter'
import { makeCreateAccountController } from '../factory-controllers/create-account-controller-factory'
import { makeCreatePixKeyController } from '../factory-controllers/create-pix-key-controller-factory'
import { makeGetAccountController } from '../factory-controllers/get-account-controller-factory'
import { makeDeletePixKeyController } from '../factory-controllers/delete-pix-key-controller-factory'



export default (router: Router): void => {
	router.post('/account/create', adaptRoute(makeCreateAccountController())) 
	router.get('/account/:cpf', adaptRoute(makeGetAccountController())) 
	router.post('/account/create/pixkey', adaptRoute(makeCreatePixKeyController())) 
	router.delete('/account/delete/pixkey/:cpf/:pix_key', adaptRoute(makeDeletePixKeyController())) 
	
}