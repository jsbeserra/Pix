import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import Cpf from '@domain/value-objects/cpf'
import { OutPutAccount } from './out-put-get-account'
import { AccountNotFound } from '@application/errors/shared-errors'
import { QueryHandler } from '@application/Handle'
import { IGatewayPix } from '@application/gateway/pix-gateway'

export default class GetAccount implements QueryHandler<string,OutPutAccount> {

	constructor(private accountQuery:IAccountQuery,private gatewayPix:IGatewayPix){}

	async handle(cpf: string): Promise<OutPutAccount> {
		const _cpf = Cpf.create(cpf)
		const account = await this.accountQuery.getAccountByCpf(_cpf.value)
		if (!account) throw new AccountNotFound()
		const pixKeys = await this.gatewayPix.getPixKey(account?.cpf)
		const output:OutPutAccount = {
			balance:account.balance,
			name:account.name,
			pix_keys:pixKeys,
			mother_name: account.mother_name,
			opening_date: account.opening_date
		}
		return output
	}
    
}