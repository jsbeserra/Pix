import { usecase } from '../usecase'
import { InputCreateAccount } from './input-create-account'
import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'

import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import PixKey from '@domain/value-objects/pix-key'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import { BankNotFoundAlreadyRegistered, CpfAlreadyRegistered, PixKeyAlreadyRegistered } from '@application/errors/use-case/create-account'

export default class CreateAccount implements usecase {

	constructor(private repository:IAccountRepository, private bankRepository:IBankRepository){}

	async handle(input: InputCreateAccount): Promise<any> {
		const cpf = Cpf.create(input.cpf)
		const pix_key = PixKey.create(input.pix_key)
		const existsCpf = await this.repository.existsCpf(cpf)
		const existsPixKey = await this.repository.existsPixKey(pix_key)
		const bank = await this.bankRepository.findById(input.bank_id)
		if (existsCpf) throw new CpfAlreadyRegistered()
		if (existsPixKey) throw new PixKeyAlreadyRegistered()
		if (!bank) throw new BankNotFoundAlreadyRegistered()
		const account = Account.create(pix_key,cpf,bank)
		await this.repository.create(account)
	}
    
}