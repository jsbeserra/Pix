import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { usecase } from '@application/usecase'
import Cpf from '@domain/value-objects/cpf'
import { InputDeposit } from './input-deposit'
import { AccountNotFound } from '@application/errors/shared-errors'
import { DepositMinimumValue } from '@application/errors/command/deposit'

export default class Deposit implements usecase{

	constructor(private repository:IAccountRepository){}
    
	async handle(input: InputDeposit): Promise<void> {
		if (input.value <= 0) throw new DepositMinimumValue()
		const cpf = Cpf.create(input.receiver_cpf)
		const exists = await this.existAccount(cpf)
		if (!exists) throw new AccountNotFound()
		const balance:number = await this.repository.balance(cpf)
		const new_balance = this.increaseTheBalance(balance,input.value)
		await this.repository.deposit(cpf,new_balance)
	}

	private async existAccount(cpf:Cpf): Promise<boolean> {
		return await this.repository.exists(cpf)
	}

	private convertToFloat(valeu:number):number {
		return parseFloat(valeu.toString())
	}

	private increaseTheBalance (balance:number, deposit:number){
		return this.convertToFloat(balance) + this.convertToFloat(deposit)
	}
    
}