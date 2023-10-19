import { DomainError } from '@domain/errors/domain-errors'

export class NameContainsNumbers extends DomainError {
	public readonly name = 'NameContainsNumbers'
	constructor (property:string) {
		super(`${property} contains numbers!`)
	}
}

export class NameAllowedCharacters extends DomainError {
	public readonly name = 'NameAllowedCharacters'
	constructor (property:string) {
		super(`${property} contains disallowed characters!`)
	}
}