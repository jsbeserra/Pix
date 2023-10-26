import { usecase } from '../usecase'
import ICache from '@application/interfaces/data/cache/icache'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'

export default class GetPixKey implements usecase<string,string[] | undefined> {

	constructor(private query:IAccountRepository, private cache:ICache, private cacheExpireIn:number){}

	async handle(cpf: string): Promise<string[] | undefined> {
		//const isCache = await this.cache.find(input_pix_key)
		//if (isCache) return JSON.parse(isCache) as OutPutGetAccount
		const account = await this.query.getAccountByCpf(cpf)
		console.log(account)
		if (!account) return
		const output = account.pixKey.map(pixKey => pixKey.value)
		
		//await this.cache.create(input_pix_key,JSON.stringify(account),this.cacheExpireIn)
		return output
	}
    
}