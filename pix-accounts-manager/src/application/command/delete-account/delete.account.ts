import { usecase } from '../usecase'
import PixKey from '@domain/value-objects/pix-key'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import { PixKeyNotFound } from '@application/errors/use-case/get-account'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'


export default class DeleteAccount implements usecase {

	constructor(private query:IAccountQuery, private accountRepository:IAccountRepository){}

	async handle(input_pix_key: string): Promise<any> {
		const pix_key = PixKey.create(input_pix_key)
		const account = await this.query.getAccountByPixKey(pix_key.value)
		if (!account) throw new PixKeyNotFound()
		await this.accountRepository.delete(pix_key)
	}
    
}