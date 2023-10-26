import { ApplicationError } from '../application-error'

export class PixKeyValueNotFound extends ApplicationError {
	public readonly name = 'Pix key value not found'
	constructor (key:string) {
		super(`Can't find pix key ${key}`)
	}
}
