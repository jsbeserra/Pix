import { ApplicationHandle } from '../../applicationHandle'
import Cpf from '@domain/value-objects/cpf'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { AccountNotFound } from '@application/errors/shared-errors'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import { FailedDeleteAccount } from '@application/errors/command/dele-account'
import { InputDeleteAccount } from './input-delete-account'


export default class DeleteAccount implements ApplicationHandle {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputDeleteAccount): Promise<void> {
		this.validateInput(input)
		const account = await this.repository.getAccount(input.cpf)
		if (!account) throw new AccountNotFound()
		this.validateDateOfBirth(account.dateOfBirth.value,input.dateOfBirth)
		if (account.pixKey) await this.sendDeletePixKey(account.pixKey.value)
		await this.repository.removePixKey(account.cpf)
	}
	
	private validateInput(input: InputDeleteAccount){
		Cpf.isValid(input.cpf)
		if (!this.isDateField(input.dateOfBirth)) throw new Error('Invalid date format')
	}

	private validateDateOfBirth(dateOfBirth:Date,inputDateOfBirth:Date) {
		if (this.isValidDay(dateOfBirth,inputDateOfBirth)) throw new Error('')
		if (this.isValidMonth(dateOfBirth,inputDateOfBirth)) throw new Error('')
		if (this.isValidYear(dateOfBirth,inputDateOfBirth)) throw new Error('')
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

	private async sendDeletePixKey(pixKey:string):Promise<void>{
		const result = await this.gatewayPix.deletePixKey(pixKey)
		if (result instanceof Error) throw new FailedDeleteAccount() 
	}

	private isDateField(dateOfBirth: any): boolean {
		return dateOfBirth instanceof Date
	}
}