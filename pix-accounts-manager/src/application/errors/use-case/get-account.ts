import { ApplicationError } from '../application-error'

export class PixKeyNotFound extends ApplicationError {
	public readonly name = 'Pix key not found'
	constructor () {
		super('pix key not found')
	}
}
