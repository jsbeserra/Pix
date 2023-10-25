import { InfraError } from '../infra-errors'

export class HttpClientErrorInfra extends InfraError {
	public readonly name = 'Http client error'
	constructor (message:string) {
		super(message)
	}
}