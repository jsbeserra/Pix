import { DomainError } from '@domain/errors/domain-errors'

export class InvalidCpfLength extends DomainError {
	public readonly name = 'Invalid cpf length'
	constructor () {
		super('Cpf must have 11 numeric digits')
	}
}

export class CpfAllDigitsAreTheSame extends DomainError {
	public readonly name = 'cpf all digits are the same'
	constructor () {
		super('The digits cannot all be the same')
	}
}

export class CpfInvalidDigit extends DomainError {
	public readonly name = 'cpf invalid digit'
	constructor () {
		super('Digits are not valid')
	}
}
