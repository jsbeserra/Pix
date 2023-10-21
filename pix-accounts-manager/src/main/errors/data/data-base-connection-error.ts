import { MainError } from '../main-errors'

export class DataBaseConnection extends MainError {
	public readonly name = 'DataBaseConnection'
	constructor () {
		super('Failed to connect to database')
	}
}