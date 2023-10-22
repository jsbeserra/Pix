export class ApplicationError extends Error {}
export class PixKeyNotFound extends ApplicationError {
	public readonly name = 'Pix key not found'
	constructor () {
		super('pix key not found')
	}
}
