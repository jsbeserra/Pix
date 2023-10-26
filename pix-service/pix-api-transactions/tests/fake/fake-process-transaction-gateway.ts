import { IProcessTransactionGateway, refaundTransactionPayload,processTransactionPayload } from '@application/interfaces/gateway/process-transaction'


export default class FakeProcessTransactionGateway implements IProcessTransactionGateway {

	constructor(){}

	async refaund(url: string, body: refaundTransactionPayload): Promise<void | Error> {
		return 
	}

	async exec(url: string, body: processTransactionPayload): Promise<void | Error> {
		return 
	}
}