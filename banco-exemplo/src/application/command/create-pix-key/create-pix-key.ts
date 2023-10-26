import { CommandHandler } from '../../Handle'
import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { InputCreatePixKey } from './input-create-cpf'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import { environment } from '@main/config/config'
import { AccountNotFound } from '@application/errors/shared-errors'

export default class CreatePixKey implements CommandHandler<InputCreatePixKey,void> {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputCreatePixKey): Promise<void> {
		const cpf = Cpf.create(input.cpf)
		const account = await this.repository.getAccount(cpf.value)
		if (!account) throw new AccountNotFound()
		await this.createPixKey(account.cpf.value,account.pixKey!.value)
	}

	private async createPixKey(cpf:string,pixkey:string){
		return await this.gatewayPix.createPixKey({
			bank_id:environment.BANK_ID!,
			cpf:cpf,
			pix_key:pixkey
		})
	}

    
}