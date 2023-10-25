import { ApplicationError } from '@application/errors/application-errors'

export class TransactionFailed extends ApplicationError {
	public readonly name = 'Transaction failed'
	constructor () {
		super('transaction failed')
	}
}

