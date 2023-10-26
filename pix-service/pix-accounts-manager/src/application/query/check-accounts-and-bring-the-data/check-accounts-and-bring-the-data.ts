import { AccountDto, IAccountQuery } from '@application/interfaces/data/query/account-query'
import { usecase } from '../../command/usecase'
import ICache from '@application/interfaces/data/cache/icache'
import {InputcheckAccountsAndBringTheData} from './input-check-accounts-and-bring-the-data'
import { OutPutcheckAccountsAndBringTheData } from './output-check-accounts-and-bring-the-data'
import PixKey from '@domain/value-objects/pix-key'
import { PixKeyValueNotFound } from '@application/errors/query/check-accounts-and-bring-the-data-errors'

export default class CheckAccountsAndBringTheData implements usecase {
	constructor(private query:IAccountQuery, private cache:ICache, private cacheExpireIn:number){}

	async handle(input: InputcheckAccountsAndBringTheData): Promise<void> {
		// this.validateInput(input)
		// const cachedData = await this.hasCache(input)
		// if (!cachedData.payer && !cachedData.receiver){
		// 	const payerAccount = await this.getAccountPayer(input.payer_pix_key)
		// 	const receiverAccount = await this.getAccountReceiver(input.receiver_pix_key)
		// 	await this.cache.create(input.payer_pix_key,JSON.stringify(payerAccount),this.cacheExpireIn)
		// 	await this.cache.create(input.receiver_pix_key,JSON.stringify(receiverAccount),this.cacheExpireIn)
		// 	return this.createOutput(payerAccount,receiverAccount)
		// } else if (cachedData.payer && !cachedData.receiver){
		// 	const receiverAccount = await this.getAccountReceiver(input.receiver_pix_key)
		// 	await this.cache.create(input.receiver_pix_key,JSON.stringify(receiverAccount),this.cacheExpireIn)
		// 	return this.createOutput(JSON.parse(cachedData.payer),receiverAccount)
		// } else if (!cachedData.payer && cachedData.receiver){
		// 	const payerAccount = await this.getAccountPayer(input.payer_pix_key)
		// 	await this.cache.create(input.payer_pix_key,JSON.stringify(payerAccount),this.cacheExpireIn)
		// 	return this.createOutput(payerAccount,JSON.parse(cachedData.receiver!))
		// } else {
		// 	return this.createOutput(JSON.parse(cachedData.payer!),JSON.parse(cachedData.receiver!))
		// }

	}

	private validateInput(input: InputcheckAccountsAndBringTheData):void{
		PixKey.create(input.payer_pix_key)
		PixKey.create(input.receiver_pix_key)
	}

	private async hasCache(input: InputcheckAccountsAndBringTheData): Promise<{payer:string | undefined, receiver:string | undefined}>{
		const payer = await this.cache.find(input.payer_pix_key)
		const receiver = await this.cache.find(input.receiver_pix_key)
		return {
			payer,
			receiver
		}
	}

	private async getAccountPayer(pixKey:string):Promise<AccountDto>{
		const account = await this.query.getAccountByPixKey(pixKey)
		if (!account) throw new PixKeyValueNotFound(pixKey)
		return account
	}

	private async getAccountReceiver(pix_key):Promise<AccountDto>{
		const account = await this.query.getAccountByPixKey(pix_key)
		if (!account) throw new PixKeyValueNotFound(pix_key)
		return account
	}

	// private createOutput(payer:AccountDto, receiver:AccountDto): OutPutcheckAccountsAndBringTheData {
	// 	const output:OutPutcheckAccountsAndBringTheData = {
	// 		payer:{
	// 			cpf: payer.cpf,
	// 			pix_key: payer.pix_key,
	// 			url_for_transaction: payer.url_for_transaction,
	// 			webhook_notification: payer.webhook_notification
	// 		},
	// 		receiver:{
	// 			cpf: receiver.cpf,
	// 			pix_key: receiver.pix_key,
	// 			url_for_transaction: receiver.url_for_transaction,
	// 			webhook_notification: receiver.webhook_notification
	// 		}
	// 	}
	// 	return output
	// }

}