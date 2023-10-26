import { usecase } from '../usecase'
import ICache from '@application/interfaces/data/cache/icache'
import {InputcheckAccountsAndBringTheData} from './input-check-accounts-and-bring-the-data'
import { OutPutcheckAccountsAndBringTheData } from './output-check-accounts-and-bring-the-data'
import PixKey from '@domain/value-objects/pix-key'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import { PixKeyValueNotFound } from '@application/errors/use-case/check-accounts-and-bring-the-data-errors'

export default class CheckAccountsAndBringTheData implements usecase<InputcheckAccountsAndBringTheData,OutPutcheckAccountsAndBringTheData> {
	constructor(private repository:IAccountRepository, private cache:ICache, private cacheExpireIn:number){}

	async handle(input: InputcheckAccountsAndBringTheData): Promise<OutPutcheckAccountsAndBringTheData> {
		this.validateInput(input)
		const cachedData = await this.hasCache(input)
		if (!cachedData.payer && !cachedData.receiver){
			const accountsData = await this.getTwoAccounts(input.payer_pix_key,input.receiver_pix_key)
			await this.saveTwoAccountInCache(accountsData.payerAccount,accountsData.receiverAccount)
			return this.createOutput(accountsData.payerAccount,accountsData.receiverAccount)
		} else if (cachedData.payer && !cachedData.receiver){
			const receiverAccount = await this.getAccountReceiver(input.receiver_pix_key)
			await this.cache.create(input.receiver_pix_key,JSON.stringify(receiverAccount),this.cacheExpireIn)
			return this.createOutput(JSON.parse(cachedData.payer),receiverAccount)
		} else if (!cachedData.payer && cachedData.receiver){
			const payerAccount = await this.getAccountPayer(input.payer_pix_key)
			await this.cache.create(input.payer_pix_key,JSON.stringify(payerAccount),this.cacheExpireIn)
			return this.createOutput(payerAccount,JSON.parse(cachedData.receiver!))
		} 
		return this.createOutput(JSON.parse(cachedData.payer!),JSON.parse(cachedData.receiver!))
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

	private async getTwoAccounts(payer_pix_key:string, receiver_pix_key:string):Promise<{payerAccount:Account,receiverAccount:Account}>{
		const payerAccount = await this.repository.getAccountByPixKey(payer_pix_key)
		if (!payerAccount) throw new PixKeyValueNotFound(payer_pix_key)
		const receiverAccount = await this.repository.getAccountByPixKey(receiver_pix_key)
		if (!receiverAccount) throw new PixKeyValueNotFound(receiver_pix_key)
		return {payerAccount,receiverAccount}
	}

	private async saveTwoAccountInCache(payer:Account, receiver:Account):Promise<void>{
		const cache = this.createOutput(payer, receiver)
		await this.cache.create(cache.payer.pix_key,JSON.stringify(cache.payer),this.cacheExpireIn)
		await this.cache.create(cache.receiver.pix_key,JSON.stringify(cache.receiver),this.cacheExpireIn)
	}

	private async getAccountPayer(pixKey:string):Promise<Account>{
		const payer = await this.repository.getAccountByPixKey(pixKey)
		if (!payer) throw new PixKeyValueNotFound(pixKey)
		return payer
	}

	private async getAccountReceiver(pix_key:string):Promise<Account>{
		const payerAccount = await this.repository.getAccountByPixKey(pix_key)
		if (!payerAccount) throw new PixKeyValueNotFound(pix_key)
		return payerAccount
	}

	private createOutput(payer:Account, receiver:Account): OutPutcheckAccountsAndBringTheData {
		const output:OutPutcheckAccountsAndBringTheData = {
			payer:{
				cpf: payer.cpf.value,
				pix_key: payer.pixKey[0].value,
				url_for_transaction: payer.bank.urlForTransactions.value,
				url_for_refund: payer.bank.url_for_refund.value
			},
			receiver:{
				cpf: receiver.cpf.value,
				pix_key: receiver.pixKey[0].value,
				url_for_transaction: receiver.bank.urlForTransactions.value,
				url_for_refund: receiver.bank.url_for_refund.value
			}
		}
		return output
	}

}