import { ApplicationError } from '../application-errors'

export class FailedDeleteAccount extends ApplicationError {
	public readonly name = 'Failed to delete account'
	constructor () {
		super('failed to delete account, try again later')
	}
}
