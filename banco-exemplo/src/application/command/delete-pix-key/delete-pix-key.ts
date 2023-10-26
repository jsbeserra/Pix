import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { AccountNotFound } from '@application/errors/shared-errors'
import { InputDeletePixKey } from './input-create-cpf'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import { CommandHandler } from '@application/Handle'


export default class DeletePixKey implements CommandHandler<InputDeletePixKey, void> {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputDeletePixKey): Promise<void> {
		this.validateInput(input)
		const account = await this.repository.getAccount(input.cpf)
		if (!account) throw new AccountNotFound()
		await this.gatewayPix.deletePixKey(input.pix_key,input.cpf)
	}

	private validateInput(input: InputDeletePixKey){
		Cpf.create(input.cpf)
	}

}