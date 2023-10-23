import { usecase } from '../../usecase'
import { InputCreateAccount } from './input-create-account'
import Account from '@domain/entities/account'
import FullName from '@domain/value-objects/full-name'
import Cpf from '@domain/value-objects/cpf'
import DateOfBirth from '@domain/value-objects/date-of-birth'
import { CpfAlreadyRegistered } from '@application/errors/command/create-account'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'

export default class CreateAccountCommand implements usecase {

	constructor(private repository:IAccountRepository){}

	async handle(input: InputCreateAccount): Promise<any> {
		const cpf = Cpf.create(input.cpf)
		const existsCpf = await this.repository.exists(cpf)
		if (existsCpf) throw new CpfAlreadyRegistered()
		const name = FullName.create(input.name)
		const motherName = FullName.create(input.motherName)
		const dateOfBirth = DateOfBirth.create(input.dateOfBirth)
		const account = new Account(cpf,name,motherName,dateOfBirth)
		await this.repository.create(account)
	}
    
}