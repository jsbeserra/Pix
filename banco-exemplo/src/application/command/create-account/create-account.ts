import { ApplicationHandle } from '../../applicationHandle'
import { InputCreateAccount } from './input-create-account'
import Account from '@domain/entities/account'
import FullName from '@domain/value-objects/full-name'
import Cpf from '@domain/value-objects/cpf'
import DateOfBirth from '@domain/value-objects/date-of-birth'
import { CpfAlreadyRegistered } from '@application/errors/command/create-account'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'

export default class CreateAccount implements ApplicationHandle {

	constructor(private repository:IAccountRepository){}

	async handle(input: InputCreateAccount): Promise<any> {
		const account = this.createAccount(input)
		const existsCpf = await this.repository.getAccount(account.cpf.value)
		if (existsCpf) throw new CpfAlreadyRegistered()
		await this.repository.create(account)
	}

	private createAccount(input: InputCreateAccount):Account{
		const _cpf = Cpf.create(input.cpf)
		const _name = FullName.create(input.name)
		const _motherName = FullName.create(input.motherName)
		const _dateOfBirth = DateOfBirth.create(input.dateOfBirth)
		return new Account(_cpf,_name,_motherName,_dateOfBirth)
	}
    
}