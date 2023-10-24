import { ApplicationError } from '@application/errors/application-error'


export class TransactionFailed extends ApplicationError {
	public readonly name = 'Transaction failed'
	constructor () {
		super('transaction failed')
	}
}

