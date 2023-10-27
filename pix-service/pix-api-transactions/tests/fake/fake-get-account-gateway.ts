import { IGatewayAccount, InputGateway, OutPutGateway } from '@application/interfaces/gateway/account-gateway'

export default class FakeGetAccountGateway implements IGatewayAccount{
	constructor(){}
    
	async exec(input: InputGateway): Promise<OutPutGateway> {
		const fakeResult:OutPutGateway = {
			payer:{
				cpf:'452.931.750-17',
				pix_key:input.payer_pix_key,
				url_for_transaction:'http://fake.com',
				url_for_refund:'http://fake.com'
			},
			receiver:{
				cpf:'828.850.310-18',
				pix_key:input.receiver_pix_key,
				url_for_transaction:'http://fake.com',
				url_for_refund:'http://fake.com'
			}
		}
		return fakeResult
	}
	
}