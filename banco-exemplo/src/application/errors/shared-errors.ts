import { ApplicationError } from './application-errors'

export class AccountNotFound extends ApplicationError {
	public readonly name = 'Account not found'
	constructor () {
		super('No account found for the CPF entered')
	}
}