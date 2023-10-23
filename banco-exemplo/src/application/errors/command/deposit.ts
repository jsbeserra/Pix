import { ApplicationError } from '../application-errors'

export class DepositMinimumValue extends ApplicationError {
	public readonly name = 'Deposit minimum value'
	constructor () {
		super('The deposit amount cannot be negative or zero')
	}
}