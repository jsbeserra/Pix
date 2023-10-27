import { MainError } from '@main/errors/main-errors'
import { badRequest, serverError } from '../http/util'
import { InfraError } from '@infra/errors/infra-errors'

  
export default function errorMapper(error:Error){
	if (error instanceof MainError || error instanceof InfraError){
		return serverError(new Error('Internal server error'))
	} else {
		return badRequest(error)
	}
}
