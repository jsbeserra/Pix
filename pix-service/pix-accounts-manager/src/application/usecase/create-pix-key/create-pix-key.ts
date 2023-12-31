import { usecase } from '../usecase'
import { InputCreatePixKey } from './input-create-account'
import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import PixKey from '@domain/value-objects/pix-key'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import { BankNotFoundAlreadyRegistered, PixKeyAlreadyRegistered } from '@application/errors/use-case/create-account'

export default class CreatePixKey implements usecase<InputCreatePixKey,void>{

	constructor(private repository:IAccountRepository, private bankRepository:IBankRepository){}

	async handle(input: InputCreatePixKey): Promise<void> {
		const pixKey = PixKey.create(input.pix_key)
		const cpf = Cpf.create(input.cpf)
		const account = await this.repository.getAccountByCpf(cpf.value)
		const existsPixKey = await this.repository.getAccountByPixKey(input.pix_key)
		if (existsPixKey) throw new PixKeyAlreadyRegistered()
		if (account && !existsPixKey){
			await this.ifTheAccountExistsAddAnewKey(input.pix_key,account.id!)
			return
		}
		await this.createAccountPix(input.bank_id,cpf,pixKey)
	}

	private async ifTheAccountExistsAddAnewKey(pixKey:string, accountId:string){
		await this.repository.createPixKey(accountId,pixKey)
	}

	private async createAccountPix(bankId:string, cpf:Cpf, pixKey:PixKey): Promise<void> {
		const bank = await this.bankRepository.findById(bankId)
		if (!bank) throw new BankNotFoundAlreadyRegistered()
		const newAccount = Account.create([pixKey],cpf,bank)
		await this.repository.createAccount(newAccount)
	}
    
}