import { ApplicationHandle } from '../../applicationHandle'
import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { InputCreatePixKey } from './input-create-cpf'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import { environment } from '@main/config/config'
import PixKey from '@domain/value-objects/pix-key'
import { AlreadyExistsAccountPixKey, FailCreatePixKey } from '@application/errors/command/create-pix-key'
import { AccountNotFound } from '@application/errors/shared-errors'

export default class CreatePixKey implements ApplicationHandle {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputCreatePixKey): Promise<void> {
		const cpf = Cpf.create(input.cpf)
		this.validateInput(input.pix_key)
		const account = await this.repository.getAccount(cpf.value)
		if (!account) throw new AccountNotFound()
		if (account!.pixKey) throw new AlreadyExistsAccountPixKey()
		account.createPixKey(input.pix_key)
		const result = await this.sendCreatePixKey(account.cpf.value,account.pixKey!.value)
		if (result instanceof Error) throw new FailCreatePixKey(result.message) 
		await this.repository.savePixKey(account.pixKey!,account.cpf)
	}

	private validateInput(pixKey: string){
		PixKey.isValid(pixKey)
	}

	private async sendCreatePixKey(cpf:string,pixkey:string){
		return await this.gatewayPix.createPixKey({
			bank_id:environment.BANK_ID!,
			cpf:cpf,
			pix_key:pixkey
		})
	}

    
}