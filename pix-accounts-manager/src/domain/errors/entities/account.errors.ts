import { DomainError } from '@domain/errors/domain-errors'

export class AccountErrorMinimumValue extends DomainError {
	public readonly name = 'AccountErrorMinimumValue'
	constructor () {
		super('Minimum value must be greater than 0')
	}
}

export class AccountErrorNegativeValue extends DomainError {
	public readonly name = 'AccountErrorNegativeValue'
	constructor () {
		super('Negative values ​​are not accepted')
	}
}

export class AccountErrorInsufficientFundsDebit extends DomainError {
	public readonly name = 'AccountErrorInsufficientFundsDebit'
	constructor () {
		super('Insufficient balance, impossible to debit')
	}
}