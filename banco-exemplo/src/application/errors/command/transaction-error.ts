import { ApplicationError } from '../application-errors'

export class InsufficientFunds extends ApplicationError {
	public readonly name = 'insufficient funds'
	constructor () {
		super('Insufficient funds')
	}
}

export class AccountDoesNotContainPixKey extends ApplicationError {
	public readonly name = 'Account does not contain pix key'
	constructor () {
		super('There is no pix key linked to the payers CPF')
	}
}


export class TransactionMinimumValue extends ApplicationError {
	public readonly name = 'Transaction minimum value'
	constructor () {
		super('The Transaction amount cannot be negative or zero')
	}
}

export class FailedTransaction extends ApplicationError {
	public readonly name = 'Transaction failed'
	constructor () {
		super('Failed to perform the transaction')
	}
}