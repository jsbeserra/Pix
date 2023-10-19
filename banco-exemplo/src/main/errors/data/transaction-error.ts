import { MainError } from '../main-errors'

export class TransactionFailed extends MainError {
	public readonly name = 'TransactionFailed'
	constructor (message:string) {
		super(`transaction failed: ${message}`)
	}
}