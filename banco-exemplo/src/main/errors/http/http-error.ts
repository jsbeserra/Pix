import { MainError } from '../main-errors'

export class HttpClientError extends MainError {
	public readonly name = 'http error'
	public readonly message:string
	constructor (message: string,readonly statusCode: number) {
		super(message + '.')
		this.message = message
	}
}

export class HttpClientECONNREFUSED extends MainError {
	constructor () {
		super('Service temporarily unavailable.')
	}
}