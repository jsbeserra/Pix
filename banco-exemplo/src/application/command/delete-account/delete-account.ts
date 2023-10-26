import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { AccountNotFound } from '@application/errors/shared-errors'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import { InputDeleteAccount } from './input-delete-account'
import { CommandHandler } from '@application/Handle'


export default class DeleteAccount implements CommandHandler<InputDeleteAccount,void> {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputDeleteAccount): Promise<void> {
		const cpf = Cpf.create(input.cpf)
		this.validateInput(input)
		const account = await this.repository.getAccount(cpf.value)
		if (!account) throw new AccountNotFound()
		this.validateDateOfBirth(account.dateOfBirth.value, new Date(input.dateOfBirth))
		const pixkey = await this.gatewayPix.getPixKey(account.cpf.value)
		//if (pixkey) await this.gatewayPix.deletePixKey(pixkey.pix_key,account.cpf.value)
	}
	
	private validateInput(input: InputDeleteAccount){
		if (!this.isDateField(input.dateOfBirth)) throw new Error('Invalid date format')
	}

	private validateDateOfBirth(dateOfBirth:Date,inputDateOfBirth:Date) {
		if (!this.isValidDay(dateOfBirth,inputDateOfBirth)) throw new Error('date provided is different from the registered date')
		if (!this.isValidMonth(dateOfBirth,inputDateOfBirth)) throw new Error('date provided is different from the registered date')
		if (!this.isValidYear(dateOfBirth,inputDateOfBirth)) throw new Error('date provided is different from the registered date')
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

	private isDateField(dateOfBirth: any): boolean {
		try {
			new Date(dateOfBirth)
			return true
		} catch (error){
			return false
		}
	}
}