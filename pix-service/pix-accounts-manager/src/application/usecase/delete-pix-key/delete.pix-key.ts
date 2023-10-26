import { usecase } from '../usecase'
import PixKey from '@domain/value-objects/pix-key'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { PixAccountOwnershipError, PixKeyNotFound } from '@application/errors/application-error'
import ICache from '@application/interfaces/data/cache/icache'
import { InputDeletePixAccount } from './input-delete-pix-key'
import Cpf from '@domain/value-objects/cpf'
import Account from '@domain/entities/account'


export default class DeletePixKey implements usecase<InputDeletePixAccount,void>{

	constructor(private repository:IAccountRepository, private cache:ICache){}

	async handle(input:InputDeletePixAccount): Promise<void> {
		this.validateInput(input)
		const account = await this.repository.getAccountByPixKey(input.pix_key)
		if (!account) throw new PixKeyNotFound()
		if (!this.isThePixAccountHolder(account,input.cpf)) throw new PixAccountOwnershipError()
		await this.cache.remove(input.pix_key)
		await this.repository.deletePixKey(input.pix_key)
		const remaingPixKeys = await this.repository.getAllPixKeysByCpf(account.cpf.value)
		if (!remaingPixKeys) await this.repository.deleteAccount(account.cpf.value)
	}

	private validateInput(input:InputDeletePixAccount):void {
		PixKey.isValid(input.pix_key)
		Cpf.isValid(input.cpf)
	}

	private isThePixAccountHolder(account:Account, cpf:string):boolean {
		const inputCpf = Cpf.create(cpf)
		return account.cpf.value === inputCpf.value
	} 
    
}