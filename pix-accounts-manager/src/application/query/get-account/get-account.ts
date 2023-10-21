import { usecase } from '../../command/usecase'
import PixKey from '@domain/value-objects/pix-key'
import { PixKeyNotFound } from '@application/errors/use-case/get-account'
import { OutPutGetAccount } from './out-put-get-account'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'

export default class GetAccount implements usecase {

	constructor(private query:IAccountQuery){}

	async handle(input_pix_key: string): Promise<OutPutGetAccount> {
		const pix_key = PixKey.create(input_pix_key)
		const account = await this.query.getAccountByPixKey(pix_key.value)
		if (!account) throw new PixKeyNotFound()
		const output:OutPutGetAccount = account
		return output
	}
    
}