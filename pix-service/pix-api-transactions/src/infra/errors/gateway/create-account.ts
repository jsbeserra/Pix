
export class GatewayError extends Error {
	public readonly name = 'Gateway Error'
	constructor () {
		super('Failure to perform transfer')
	}
}

