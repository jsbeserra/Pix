import { IGatewayPix, InputCreatePixKey } from '@application/gateway/pix-gateway'
import HttpClient from '@infra/http/http-client'
import { environment } from '@main/config/config'

export default class PixGateway implements IGatewayPix {
	constructor(private httpClient:HttpClient){}

	async getPixKey(cpf: string): Promise<string[]> {
		return await this.httpClient.get(`${environment.PIX_ACCOUNTS_API_URL}/pixkey/${cpf}`)
	}

	async createPixKey(input: InputCreatePixKey): Promise<any> {
		return await this.httpClient.post(`${environment.PIX_ACCOUNTS_API_URL}/pixkey`,input)
	}

	async deletePixKey(pix_key: string, cpf:string): Promise<any> {
		return await this.httpClient.delete(`${environment.PIX_ACCOUNTS_API_URL}/pixkey/${pix_key}/${cpf}`)
	}

	async transaction(payerPixKey: string, receiverPixKey: string, value: number): Promise<{ code: string; status: string }> {
		const payload = {
			payer_pix_key: payerPixKey,
			receiver_pix_key: receiverPixKey,
			value: value
		}
		return await this.httpClient.post(`${environment.PIX_TRANSACTION_API_URL}/transaction`,payload)
	}
	
}