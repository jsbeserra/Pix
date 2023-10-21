import { DomainError } from '@domain/errors/domain-errors'

export class InvalidCpf extends DomainError {
	public readonly name = 'InvalidCpf'
	constructor () {
		super('Invalid Cpf')
	}
}