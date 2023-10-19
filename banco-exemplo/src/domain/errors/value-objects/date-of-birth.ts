import { DomainError } from '@domain/errors/domain-errors'

export class InvalidDateOfBirth extends DomainError {
	public readonly name = 'InvalidDateOfBirth'
	constructor () {
		super('Invalid date of birth')
	}
}

export class DateOfBirthErrorMaximumAge extends DomainError {
	public readonly name = 'DateOfBirthErrorMaximumAge'
	constructor () {
		super('Error Maximum age for a human being reached')
	}
}

export class DateOfBirthErrorMinimumAge extends DomainError {
	public readonly name = 'DateOfBirthErrorMinimumAge'
	constructor (minimumAge: number) {
		super(`Minimum age must be greater than or equal to ${minimumAge}`)
	}
}