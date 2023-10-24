import Account from '@domain/entities/account'
import Bank from '@domain/entities/bank'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import Url from '@domain/value-objects/url'
import { faker } from '@faker-js/faker'

describe('Create Account',()=>{
	it('Should create a account',()=>{
		const fakePixKey = PixKey.create('123SSSsssd')
		const fakeCpf = Cpf.create('340.962.240-30')
		const fakeBankUrl = Url.create('http://www.fake.com/transacitons')
		const fakeBankWebHookUrl = Url.create('http://www.fake.com/transacitons')
		const fakeBank = Bank.create('banco tabajara', fakeBankUrl,fakeBankWebHookUrl)
		const account = Account.create(fakePixKey,fakeCpf,fakeBank)
		expect(account.cpf.value).toBe(fakeCpf.value)
		expect(account.pixKey.value).toBe(fakePixKey.value)
		expect(account.bank.urlForTransactions.value).toBe('http://www.fake.com/transacitons')
	})

	it('Should restore account',()=>{
		const bank = Bank.restore('2',faker.person.firstName(),faker.internet.url(),faker.internet.url())
		const account = Account.restore('1','45693014010',bank)
		expect(account).toBeInstanceOf(Account)
	})
})