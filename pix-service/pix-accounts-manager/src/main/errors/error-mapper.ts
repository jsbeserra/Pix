import { MainError } from '@main/errors/main-errors'
import { badRequest, serverError } from '../http/util'

  
export default function errorMapper(error:any){
	if (error instanceof MainError){
		return serverError(new Error('Internal server error'))
	} else {
		return badRequest(error)
	}
}
