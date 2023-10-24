import { ApplicationError } from './application-errors'

export class TransactionNotFound extends ApplicationError {
	public readonly name = 'Transaction not found'
	constructor () {
		super('No transaction was found for the given code')
	}
}