import { ApplicationError } from '@application/errors/application-errors'


export class GatewayError extends ApplicationError {
	public readonly name = 'Gateway Error'
	constructor () {
		super('Failure to perform transfer')
	}
}

