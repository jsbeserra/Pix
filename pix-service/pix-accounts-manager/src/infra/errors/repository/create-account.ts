import { InfraError } from '../infra-error'


export class TransactionFailed extends InfraError {
	public readonly name = 'Transaction failed'
	constructor () {
		super('transaction failed')
	}
}

