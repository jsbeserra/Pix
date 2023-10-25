import { ApplicationHandle } from '../../applicationHandle'
import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import PixKey from '@domain/value-objects/pix-key'
import { FailedToRemovePixKey, PixKeyDoesNotExist, PixKeyNotBelongToAccount } from '@application/errors/command/dele-pix-key'
import { AccountNotFound } from '@application/errors/shared-errors'
import { InputDeletePixKey } from './input-create-cpf'
import { IGatewayPix } from '@application/gateway/pix-gateway'


export default class DeletePixKey implements ApplicationHandle {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputDeletePixKey): Promise<void> {
		this.validateInput(input)
		const account = await this.repository.getAccount(input.cpf)
		if (!account) throw new AccountNotFound()
		if (!account.pixKey) throw new PixKeyDoesNotExist()
		this.keysAreTheSame(account.pixKey.value,input.pix_key)
		await this.sendDelePixKey(input.pix_key)
		await this.repository.removePixKey(account.cpf)
	}
	
	private validateInput(input: InputDeletePixKey){
		Cpf.create(input.cpf)
		PixKey.create(input.pix_key)
	}

	private keysAreTheSame(accountPixKey:string, pixKeyToBeRemoved:string) {
		if (accountPixKey != pixKeyToBeRemoved) throw new PixKeyNotBelongToAccount()
	} 

	private async sendDelePixKey(pixKey:string):Promise<void>{
		const result = await this.gatewayPix.deletePixKey(pixKey)
		if (result instanceof Error) throw new FailedToRemovePixKey(result.message) 
	}
}