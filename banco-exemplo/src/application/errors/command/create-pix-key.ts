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

export class AlreadyExistsAccountPixKey extends ApplicationError {
	public readonly name = 'Already exists account pixKey'
	constructor () {
		super('There is already a pix key for this account, delete it to create a new one')
	}
}