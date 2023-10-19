import { ApplicationError } from '../application-errors'

export class CpfAlreadyRegistered extends ApplicationError {
	public readonly name = 'Cpf already registered'
	constructor () {
		super('There is already a similar CPF registered in the database')
	}
}