import { MainError } from '../main-errors'

export class HttpClientError extends MainError {
	public readonly name = 'http error'
	constructor (message: string,readonly statusCode: number) {
		super(message + '.')
	}
}