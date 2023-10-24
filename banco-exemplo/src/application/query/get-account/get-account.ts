import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import Cpf from '@domain/value-objects/cpf'
import { OutPutAccount } from './out-put-get-account'
import { AccountNotFound } from '@application/errors/shared-errors'
import { ApplicationHandle } from '@application/applicationHandle'

export default class GetAccount implements ApplicationHandle {

	constructor(private accountQuery:IAccountQuery){}

	async handle(cpf: string): Promise<OutPutAccount> {
		const _cpf = Cpf.create(cpf)
		const result = await this.accountQuery.getAccountByCpf(_cpf.value)
		if (!result) throw new AccountNotFound()
		const output:OutPutAccount = {
			balance:result.balance,
			name:result.name,
			pix_key:result.pix_key
		}
		return output
	}
    
}