import { IGatewayAccount, InputGateway, OutPutGateway } from '@application/interfaces/gateway/account-gateway'
import HttpClient from '@infra/http/http-client'
import { environment } from '@main/config/config'

export default class GetAccountGateway implements IGatewayAccount{
	constructor(private httpClient:HttpClient){}
    
	async exec(input: InputGateway): Promise<OutPutGateway> {
		const result = await this.httpClient.get(`${environment.PIX_ACCOUNTS_MANAGER_URL}/pixkey/two/details/${input.payer_pix_key}/${input.receiver_pix_key}`)
		return result as OutPutGateway
	}
	
}