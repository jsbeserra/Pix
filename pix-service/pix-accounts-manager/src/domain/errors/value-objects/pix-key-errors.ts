import { DomainError } from '@domain/errors/domain-errors'

export class PixKeyUnacceptedCharacters extends DomainError {
	public readonly name = 'PixKeyUnacceptedCharacters'
	constructor () {
		super('Pix key must contain only uppercase or lowercase letters and numbers')
	}
}

export class PixKeyMinimumLength extends DomainError {
	public readonly name = 'PixKeyMinimumLength'
	constructor (lenght:number) {
		super(`PixKey must contain at least ${lenght} characters`)
	}
}

export class PixKeyMaximumLength extends DomainError {
	public readonly name = 'PixKeyMaximumLength'
	constructor (lenght:number) {
		super(`PixKey must contain a maximum of ${lenght} characters`)
	}
}