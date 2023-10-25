import Cpf from '@domain/value-objects/cpf'
import DateOfBirth from '@domain/value-objects/date-of-birth'
import FullName from '@domain/value-objects/full-name'
import { AccountErrorInsufficientFundsDebit, AccountErrorMinimumValue, AccountErrorNegativeValue } from '../errors/entities'
import PixKey from '@domain/value-objects/pix-key'

export default class Account {

	private _pixKey?:PixKey

	constructor(
		readonly cpf:Cpf,
		readonly name:FullName, 
		readonly motherName:FullName, 
        readonly dateOfBirth:DateOfBirth,
		private _balance: number = 1000.00, 
		readonly openingDate:Date = new Date(), 
		private active:boolean = true
	){}

	public static restore(cpf:string, name:string, motherName:string,
		dateOfBirth:string, balance: number, openingDate:Date, active:boolean, pixKey?:string):Account{
		const account = new Account(
			Cpf.restore(cpf),
			FullName.restore(name),
			FullName.restore(motherName),
			DateOfBirth.restore(dateOfBirth),
			balance,
			openingDate,
			active
		)
		if (pixKey) account.createPixKey(pixKey)
		return account
	}

	get isActive(): boolean{
		return this.active
	}

	get balance(): number {
		return this._balance
	}

	get pixKey(): PixKey|undefined {
		return this._pixKey
	}

	public deposit(depositValue:number): void {
		if (this.isZero(depositValue)) throw new AccountErrorMinimumValue()
		if (this.isNegative(depositValue)) throw new AccountErrorNegativeValue()
		this._balance = parseFloat(this._balance.toString()) + parseFloat(depositValue.toString())
	}

	public debit(debitValue:number): void {
		if (this.isZero(debitValue)) throw new AccountErrorMinimumValue()
		if (this.isNegative(debitValue)) throw new AccountErrorNegativeValue()
		if (debitValue > this._balance) throw new AccountErrorInsufficientFundsDebit()
		this._balance -= debitValue
	}

	public createPixKey(key:string): void {
		this._pixKey = PixKey.create(key)
	}

	public removePixKey(): void {
		this._pixKey = undefined
	}

	private isZero(value:number): boolean {
		return value === 0
	}

	private isNegative(value:number): boolean {
		return value < 0
	}
    
}