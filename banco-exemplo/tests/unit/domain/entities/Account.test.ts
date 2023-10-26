import Account from '@domain/entities/account'
import { AccountErrorInsufficientFundsDebit, AccountErrorMinimumValue, AccountErrorNegativeValue } from '@domain/errors/entities'
import Cpf from '@domain/value-objects/cpf'
import DateOfBirth from '@domain/value-objects/date-of-birth'
import FullName from '@domain/value-objects/full-name'

describe('Create Account',()=>{
	it('Should create a account',()=>{
		const fakeName = FullName.create('Zephyr Evergreen')
		const fakeCpf = Cpf.create('340.962.240-30')
		const fakeMotherName = FullName.create('Seraphina Moonshadow')
		const fakeDateOfBirth = DateOfBirth.create('1999-05-15')
		const account = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth)
		expect(account.cpf.value).toBe(fakeCpf.value)
		expect(account.name.value).toBe(fakeName.value)
		expect(account.motherName.value).toBe(fakeMotherName.value)
		expect(account.dateOfBirth.value).toBe(fakeDateOfBirth.value)
	})

	it('Should create an account with a 1000 balance',()=>{
		const fakeName = FullName.create('Zephyr Evergreen')
		const fakeCpf = Cpf.create('340.962.240-30')
		const fakeMotherName = FullName.create('Seraphina Moonshadow')
		const fakeDateOfBirth = DateOfBirth.create('1999-05-15')
		const account = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth)
		expect(account.balance).toBe(1000)
	})

	it('Should create an account with a previous balance',()=>{
		const fakeName = FullName.create('Zephyr Evergreen')
		const fakeCpf = Cpf.create('340.962.240-30')
		const fakeMotherName = FullName.create('Seraphina Moonshadow')
		const fakeDateOfBirth = DateOfBirth.create('1999-05-15')
		const balance = 100
		const account = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth,balance)
		expect(account.balance).toBe(balance)
	})

	it('Should create an account with a previous balance',()=>{
		const fakeName = FullName.create('Zephyr Evergreen')
		const fakeCpf = Cpf.create('340.962.240-30')
		const fakeMotherName = FullName.create('Seraphina Moonshadow')
		const fakeDateOfBirth = DateOfBirth.create('1999-05-15')
		const balance = 100
		const account = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth,balance)
		expect(account.balance).toBe(balance)
	})

	it('Should restore an account',()=>{
		const fakeName = 'Zephyr Evergreen'
		const fakeCpf = '340.962.240-30'
		const fakeMotherName = 'Seraphina Moonshadow'
		const fakeDateOfBirth = '1999-05-15'
		const openingDate = new Date()
		const balance = 100
		const account = Account.restore(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth,balance,openingDate,true)
		expect(account.cpf.value).toBe(fakeCpf)
		expect(account.name.value).toBe(fakeName)
		expect(account.motherName.value).toBe(fakeMotherName)
		expect(account.dateOfBirth.value).toEqual(new Date(fakeDateOfBirth))
		expect(account.balance).toBe(balance)
	})

	it('Should restore an account with a pix key',()=>{
		const fakeName = 'Zephyr Evergreen'
		const fakeCpf = '340.962.240-30'
		const fakeMotherName = 'Seraphina Moonshadow'
		const fakeDateOfBirth = '1999-05-15'
		const openingDate = new Date()
		const balance = 100
		const account = Account.restore(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth,balance,openingDate,true)
		expect(account.cpf.value).toBe(fakeCpf)
		expect(account.name.value).toBe(fakeName)
		expect(account.motherName.value).toBe(fakeMotherName)
		expect(account.dateOfBirth.value).toEqual(new Date(fakeDateOfBirth))
		expect(account.balance).toBe(balance)
	})

})

describe('Account Operations',() => {
	let fakeName:FullName = FullName.create('Zephyr Evergreen')
	let fakeCpf:Cpf = Cpf.create('123.456.789-09')
	let fakeMotherName:FullName = FullName.create('Seraphina Moonshadow')
	let fakeDateOfBirth:DateOfBirth = DateOfBirth.create('1999-05-15')
	let sut:Account = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth)

	afterEach(()=>{
		fakeName = FullName.create('Zephyr Evergreen')
		fakeCpf = Cpf.create('123.456.789-09')
		fakeMotherName = FullName.create('Seraphina Moonshádow')
		fakeDateOfBirth = DateOfBirth.create('1999-05-15')
		sut = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth)
	})

	it('Should debit the balance of an account',() => {
		sut.debit(100)
		expect(sut.balance).toBe(900)
	})

	it('Should debit the entire balance, the current balance is 1000',() => {
		sut.debit(1000)
		expect(sut.balance).toBe(0)
	})

	it('Should not debit an account without a balance',() => {
		const initialBalance = 0
		sut = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth,initialBalance)
		const debitValue = 20
		expect(() => sut.debit(debitValue)).toThrow(new AccountErrorInsufficientFundsDebit())
		expect(sut.balance).toBe(0)
	})

	it('Should not debit negative amounts',() => {
		const debitValue = -20
		expect(() => sut.debit(debitValue)).toThrow(new AccountErrorNegativeValue())
	})

	it('Should not debit if the debit amount is 0',() => {
		const debitValue = 0
		expect(() => sut.debit(debitValue)).toThrow(new AccountErrorMinimumValue())
	})

	it('Should not make a deposit if the amount is 0',() => {
		const depositValue = 0
		expect(() => sut.deposit(depositValue)).toThrow(new AccountErrorMinimumValue())
	})

	it('Should not make a deposit if the amount is negative',() => {
		const depositValue = -50
		expect(() => sut.deposit(depositValue)).toThrow(new AccountErrorNegativeValue())
	})

	it('Should must make a deposit',() => {
		const depositValue = 50
		const initialBalance = 0
		sut = new Account(fakeCpf,fakeName,fakeMotherName,fakeDateOfBirth,initialBalance)
		sut.deposit(depositValue)
		expect(sut.balance).toBe(50)
	})
	
})