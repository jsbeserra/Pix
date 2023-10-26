import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { AccountNotFound } from '@application/errors/shared-errors'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import { InputDeleteAccount } from './input-delete-account'
import { CommandHandler } from '@application/Handle'
import { InvalidDateOfBirth } from '@domain/errors/value-objects'


export default class DeleteAccount implements CommandHandler<InputDeleteAccount,void> {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputDeleteAccount): Promise<void> {
		if (!this.isValidDate(input.dateOfBirth)) throw new Error('Invalid date format')
		const cpf = Cpf.create(input.cpf)
		const account = await this.repository.getAccount(cpf.value)
		if (!account) throw new AccountNotFound()
		this.validateDateOfBirth(account.dateOfBirth.value, new Date(input.dateOfBirth))
		await this.repository.deleteAccount(account.cpf.value)
		await this.removePixKey(account.cpf.value)
	}

	private async removePixKey(cpf:string):Promise<void>{
		const pixkeys = await this.gatewayPix.getPixKey(cpf)
		for (const key of pixkeys){
			await this.gatewayPix.deletePixKey(key,cpf)
		}
	}


	private validateDateOfBirth(dateOfBirth:Date,inputDateOfBirth:Date) {
		if (!this.isValidDay(dateOfBirth,inputDateOfBirth)) throw new InvalidDateOfBirth()
		if (!this.isValidMonth(dateOfBirth,inputDateOfBirth)) throw new InvalidDateOfBirth()
		if (!this.isValidYear(dateOfBirth,inputDateOfBirth)) throw new InvalidDateOfBirth()
	}
    
	private isValidDay(dateOfBirth:Date,inputDateOfBirth:Date): boolean {
		return dateOfBirth.getDay() === inputDateOfBirth.getDay()
	}

	private isValidMonth(dateOfBirth:Date,inputDateOfBirth:Date): boolean {
		const incrementeMonth = 1
		return dateOfBirth.getMonth() + incrementeMonth === inputDateOfBirth.getMonth() + incrementeMonth
	}

	private isValidYear(dateOfBirth:Date,inputDateOfBirth:Date): boolean {
		return dateOfBirth.getFullYear() === inputDateOfBirth.getFullYear()
	}

	private isValidDate(dateOfBirth: any): boolean {
		try {
			new Date(dateOfBirth)
			return true
		} catch (error){
			return false
		}
	}
}