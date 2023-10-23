import { ApplicationError } from '../application-errors'

export class FailCreatePixKey extends ApplicationError {
	public readonly name = 'Failed to create pix key'
	constructor (message:string) {
		super(message)
	}
}

export class AccountNotFound extends ApplicationError {
	public readonly name = 'Account Not Found'
	constructor () {
		super('Unable to create pix key, account not found')
	}
}