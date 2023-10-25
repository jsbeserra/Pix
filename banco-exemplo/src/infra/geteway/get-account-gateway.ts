import { IGatewayPix, InputCreatePixKey } from '@application/gateway/pix-gateway'
import PixKey from '@domain/value-objects/pix-key'

import HttpClient from '@infra/http/http-client'
import { environment } from '@main/config/config'

export default class PixGateway implements IGatewayPix{
	constructor(private httpClient:HttpClient){}

	async createPixKey(input: InputCreatePixKey): Promise<any> {
		return await this.httpClient.post(`${environment.PIX_ACCOUNTS_API_URL}/pixkey`,input)
	}

	async deletePixKey(pix_key: string): Promise<any> {
		return await this.httpClient.delete(`${environment.PIX_ACCOUNTS_API_URL}/pixkey/${pix_key}`)
	}

	async transaction(payerPixKey: PixKey, receiverPixKey: PixKey, value: number): Promise<{ code: string; status: string }> {
		const payload = {
			payer_pix_key: payerPixKey.value,
			receiver_pix_key: receiverPixKey.value,
			value: value
		}
		return await this.httpClient.post(`${environment.PIX_TRANSACTION_API_URL}/transaction`,payload)
	}
	
}