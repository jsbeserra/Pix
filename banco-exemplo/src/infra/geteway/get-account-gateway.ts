import { IGatewayPix, InputCreatePixKey } from '@application/gateway/pix-gateway'

import HttpClient from '@infra/http/http-client'
import { environment } from '@main/config/config'

export default class PixGateway implements IGatewayPix{
	constructor(private httpClient:HttpClient){}

	async createPixKey(input: InputCreatePixKey): Promise<any> {
		return await this.httpClient.post(`${environment.PIX_API_URL}/create/pix-account`,input)
	}

	async deletePixKey(pix_key: string): Promise<any> {
		await this.httpClient.delete(`${environment.PIX_API_URL}/api/delete/pix-account/${pix_key}`)
	}
    
	// async exec(input: InputGateway): Promise<OutPutGateway> {
	// 	const result = await this.httpClient.get(`${environment.PIX_ACCOUNTS_MANAGER_URL}/get/get-accounts-data/${input.payer_pix_key}/${input.receiver_pix_key}`)
	// 	return result as OutPutGateway
	// }
	
}