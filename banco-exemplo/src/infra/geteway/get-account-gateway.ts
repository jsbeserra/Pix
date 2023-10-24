import { IGatewayPix, InputCreatePixKey } from '@application/gateway/pix-gateway'

import HttpClient from '@infra/http/http-client'
import { environment } from '@main/config/config'

export default class PixGateway implements IGatewayPix{
	constructor(private httpClient:HttpClient){}

	async createPixKey(input: InputCreatePixKey): Promise<any> {
		return await this.httpClient.post(`${environment.PIX_API_URL}/pixkey`,input)
	}

	async deletePixKey(pix_key: string): Promise<any> {
		return await this.httpClient.delete(`${environment.PIX_API_URL}/pixkey/${pix_key}`)
	}
	
}