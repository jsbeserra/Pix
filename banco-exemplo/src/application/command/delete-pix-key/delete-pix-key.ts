import { usecase } from '../../usecase'
import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import PixKey from '@domain/value-objects/pix-key'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import { FailedToRemovePixKey, PixKeyDoesNotExist, PixKeyNotBelongToAccount } from '@application/errors/command/dele-pix-key'
import { AccountNotFound } from '@application/errors/shared-errors'
import { InputDeletePixKey } from './input-create-cpf'
import { IGatewayPix } from '@application/gateway/pix-gateway'


export default class DeletePixKey implements usecase {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix, private accountQuery:IAccountQuery){}

	async handle(input: InputDeletePixKey): Promise<void> {
		const cpf = Cpf.create(input.cpf)
		const pixkey = PixKey.create(input.pix_key)
		if (!await this.existAccount(cpf)) throw new AccountNotFound()
		const account = await this.accountQuery.getAccountByCpf(cpf.value)
		if (!account!.pix_key) throw new PixKeyDoesNotExist()
		if (account!.pix_key != pixkey.value) throw new PixKeyNotBelongToAccount()
		const result = await this.gatewayPix.deletePixKey(input.pix_key)
		if (result instanceof Error) throw new FailedToRemovePixKey(result.message) 
		await this.repository.removePixKey(pixkey,cpf)
	}

	private async existAccount(cpf:Cpf): Promise<boolean> {
		return await this.repository.exists(cpf)
	} 
}