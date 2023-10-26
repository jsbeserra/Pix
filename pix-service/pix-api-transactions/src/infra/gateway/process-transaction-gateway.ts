
import { IProcessTransactionGateway, processTransactionPayload, refaundTransactionPayload } from '@application/interfaces/gateway/process-transaction'
import HttpClient from '@infra/http/http-client'


export default class ProcessTransactionGateway implements IProcessTransactionGateway {

	constructor(private httpClient:HttpClient){}

	async refaund(url: string, body: refaundTransactionPayload): Promise<void | Error> {
		return await this.httpClient.post(url,body)
	}

	async exec(url: string, body: processTransactionPayload): Promise<void | Error> {
		return await this.httpClient.post(url,body)
	}
}