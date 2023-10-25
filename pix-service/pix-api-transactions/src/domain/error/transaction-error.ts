import { DomainError } from './domain-errors'

export class ErrorMinimumValue extends DomainError {
	public readonly name = 'ErrorMinimumValue'
	constructor () {
		super('Minimum value must be greater than 0')
	}
}

export class ErrorNegativeValue extends DomainError {
	public readonly name = 'Error negative value'
	constructor () {
		super('Negative values ​​are not accepted')
	}
}