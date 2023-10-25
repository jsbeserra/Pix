
import { IProcessTransactionGateway, ProcessTransactionPayload } from '@application/interfaces/gateway/process-transaction'

export default class FakeProcessTransactionGateway implements IProcessTransactionGateway {

	constructor(){}

	async exec(url: string, body: ProcessTransactionPayload): Promise<void | Error> {
		return 
	}
}