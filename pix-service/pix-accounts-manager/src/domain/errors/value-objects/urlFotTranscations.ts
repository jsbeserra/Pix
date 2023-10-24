import { DomainError } from '@domain/errors/domain-errors'

export class InvalidProtocol extends DomainError {
	public readonly name = 'Invalid protocol'
	constructor () {
		super('Accepted protocols are http:// and https://')
	}
}

export class InvalidDomain extends DomainError {
	public readonly name = 'Invalid domain'
	constructor () {
		super('Exemplo de dominio validos example.com, subdomain.example.com')
	}
}