import { ApplicationError } from '../application-errors'

export class PixKeyDoesNotExist extends ApplicationError {
	public readonly name = 'Pix key does not exist'
	constructor () {
		super('No pix key registered in the account')
	}
}

export class FailedToRemovePixKey extends ApplicationError {
	public readonly name = 'Failed to remove pix key'
	constructor (message:string) {
		super(message)
	}
}

export class PixKeyNotBelongToAccount extends ApplicationError {
	public readonly name = 'Failed to remove pix key'
	constructor () {
		super('Pix key does not belong to the account provided')
	}
}