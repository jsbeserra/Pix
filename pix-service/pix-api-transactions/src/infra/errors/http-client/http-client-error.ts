import { InfraError } from '../infra-error'


export class HttpClientErrorInfra extends InfraError {
	public readonly name = 'Http client error'
	constructor (message:string) {
		super(message)
	}
}

export class HttpClientECONNREFUSED extends InfraError {
	constructor () {
		super('Service temporarily unavailable.')
	}
}