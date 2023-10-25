import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Cpf from '@domain/value-objects/cpf'
import { InputDeposit } from './input-deposit'
import { AccountNotFound } from '@application/errors/shared-errors'
import { DepositMinimumValue } from '@application/errors/command/deposit'
import { ApplicationHandle } from '@application/applicationHandle'

export default class Deposit implements ApplicationHandle{

	constructor(private repository:IAccountRepository){}
    
	async handle(input: InputDeposit): Promise<void> {
		this.validateInput(input)
		const account = await this.repository.getAccount(input.receiver_cpf)
		if (!account) throw new AccountNotFound()
		account.deposit(input.value)
		await this.repository.deposit(account.cpf,account.balance)
	}
	
	private validateInput(input: InputDeposit){
		if (input.value <= 0) throw new DepositMinimumValue()
		Cpf.isValid(input.receiver_cpf)
	}

	private convertToFloat(valeu:number):number {
		return parseFloat(valeu.toString())
	}

	private increaseTheBalance (balance:number, deposit:number):number {
		return this.convertToFloat(balance) + this.convertToFloat(deposit)
	}
    
}