import { usecase } from '../../usecase'
import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { InputCreatePixKey } from './input-create-cpf'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import { environment } from '@main/config/config'
import PixKey from '@domain/value-objects/pix-key'
import { AccountNotFound, FailCreatePixKey } from '@application/errors/command/create-pix-key'

export default class CreatePixKey implements usecase {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputCreatePixKey): Promise<any> {
		const cpf = Cpf.create(input.cpf)
		const pixkey = PixKey.create(input.pix_key)
		if (await this.existAccount(cpf)) throw new AccountNotFound()
		const result = await this.gatewayPix.createPixKey({
			bank_id:environment.BANK_ID!,
			cpf:input.cpf,
			pix_key:input.pix_key
		})
		if (result instanceof Error) throw new FailCreatePixKey(result.message) 
		await this.repository.savePixKey(pixkey,cpf)
	}

	private async existAccount(cpf:Cpf): Promise<boolean> {
		return await this.repository.exists(cpf)
	}
    
}