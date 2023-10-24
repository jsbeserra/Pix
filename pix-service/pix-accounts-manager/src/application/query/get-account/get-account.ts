import { usecase } from '../../command/usecase'
import PixKey from '@domain/value-objects/pix-key'
import { OutPutGetAccount } from './out-put-get-account'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import { PixKeyNotFound } from '@application/errors/application-error'
import ICache from '@application/interfaces/data/cache/icache'

export default class GetAccount implements usecase {

	constructor(private query:IAccountQuery, private cache:ICache, private cacheExpireIn:number){}

	async handle(input_pix_key: string): Promise<OutPutGetAccount> {
		const pix_key = PixKey.create(input_pix_key)
		const isCache = await this.cache.find(input_pix_key)
		if (isCache) return JSON.parse(isCache) as OutPutGetAccount
		const account = await this.query.getAccountByPixKey(pix_key.value)
		if (!account) throw new PixKeyNotFound()
		const output:OutPutGetAccount = account
		await this.cache.create(input_pix_key,JSON.stringify(output),this.cacheExpireIn)
		return output
	}
    
}