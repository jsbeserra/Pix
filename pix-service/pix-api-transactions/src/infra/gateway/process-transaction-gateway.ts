
import { IProcessTransactionGateway, ProcessTransactionPayload } from '@application/interfaces/gateway/process-transaction'
import HttpClient from '@infra/http/http-client'


export default class ProcessTransactionGateway implements IProcessTransactionGateway {

	constructor(private httpClient:HttpClient){}

	async exec(url: string, body: ProcessTransactionPayload): Promise<void | Error> {
		return await this.httpClient.post(url,body)
	}
}