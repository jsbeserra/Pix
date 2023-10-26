import { usecase } from '../../command/usecase'
import { OutPutGetPixKey } from './out-put-get-account'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import ICache from '@application/interfaces/data/cache/icache'

export default class GetPixKey implements usecase {

	constructor(private query:IAccountQuery, private cache:ICache, private cacheExpireIn:number){}

	async handle(cpf: string): Promise<OutPutGetPixKey | undefined> {
		//const isCache = await this.cache.find(input_pix_key)
		//if (isCache) return JSON.parse(isCache) as OutPutGetAccount
		const account = await this.query.getAccountByPixCpf(cpf)
		console.log(account)
		if (!account) return
		const output:OutPutGetPixKey = {
			pix_key:account.pix_key
		}
		//await this.cache.create(input_pix_key,JSON.stringify(account),this.cacheExpireIn)
		return output
	}
    
}