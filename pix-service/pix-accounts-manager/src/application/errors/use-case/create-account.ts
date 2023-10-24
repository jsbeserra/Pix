import { ApplicationError } from '../application-error'

export class CpfAlreadyRegistered extends ApplicationError {
	public readonly name = 'Cpf already registered'
	constructor () {
		super('There is already a similar CPF registered in the database')
	}
}

export class PixKeyAlreadyRegistered extends ApplicationError {
	public readonly name = 'Pix Key already registered'
	constructor () {
		super('There is already a similar Pix Key registered in the database')
	}
}

export class BankNotFoundAlreadyRegistered extends ApplicationError {
	public readonly name = 'Bank not found'
	constructor () {
		super('No bank was found with the provided id')
	}
}

export class BankAlreadyExists extends ApplicationError {
	public readonly name = 'Bank already exists'
	constructor () {
		super('Bank already exists')
	}
}