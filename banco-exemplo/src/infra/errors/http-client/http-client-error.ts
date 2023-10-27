
export class HttpClientErrorInfra extends Error{
	public readonly name = 'Http client error'
	constructor (message:string) {
		super(message)
	}
}