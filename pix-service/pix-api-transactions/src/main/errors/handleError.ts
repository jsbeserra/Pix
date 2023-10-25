import { MainError } from '@main/errors/main-errors'
import { badRequest, serverError } from '../../infra/http/util'

  
export default function handleError(error:any){
	if (error instanceof MainError){
		return serverError(new Error('Internal server error'))
	} else {
		return badRequest(error)
	}
}
