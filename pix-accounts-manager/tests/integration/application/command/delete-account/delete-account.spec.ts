import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import BankRepository from '@infra/repository/bank-repository-sql'
import {faker} from '@faker-js/faker'
import { TypeOrmHelper } from '@main/data-base/typeorm/tyepeorm.helper'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import AccountQuery from '@infra/query/get-account-query'
import AccountRepository from '@infra/repository/Accout-repository-sql'
import DeleteAccount from '@application/command/delete-account/delete.account'
import Bank from '@domain/entities/bank'
import Url from '@domain/value-objects/url'
import Account from '@domain/entities/account'
import PixKey from '@domain/value-objects/pix-key'
import Cpf from '@domain/value-objects/cpf'
import { PixKeyNotFound } from '@application/errors/application-error'


describe('Delete Account',()=>{
	let accountQuery:IAccountQuery
	let accountRepository:IAccountRepository
	let bankRepository: IBankRepository
	let sut:DeleteAccount

	beforeAll(async()=>{
		await TypeOrmHelper.connect()
		bankRepository = new BankRepository()
		accountRepository = new AccountRepository()
		accountQuery = new AccountQuery()
		sut = new DeleteAccount(accountQuery,accountRepository)
	})

	afterEach(async ()=>{
		await TypeOrmHelper.getAccountEntity().clear()
		await TypeOrmHelper.getBankEntity().clear()
	})

	afterAll(async ()=>{
		await TypeOrmHelper.disconect()
	})

	it('Should delete account', async ()=>{
		const pix_key = '458sadert'
		const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('teste2')
		const account = Account.create(PixKey.create(pix_key),Cpf.create('990.650.830-22'),bankData!)
		await accountRepository.create(account)
		await expect(sut.handle(pix_key)).resolves.toBeUndefined()
	})

	it('Should fail if pix key not found', async ()=>{
		const pix_key = '0xc00007b'
		await expect(sut.handle(pix_key)).rejects.toThrow(new PixKeyNotFound())
	})

	// it('Should fail delete account', async ()=>{
	// 	const pix_key = '458sadert'
	// 	const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
	// 	await bankRepository.create(bank)
	// 	const bankData = await bankRepository.findByName('teste2')
	// 	const account = Account.create(PixKey.create(pix_key),Cpf.create('990.650.830-22'),bankData!)
	// 	await accountRepository.create(account)
	// 	await expect(sut.handle(pix_key)).resolves.toThrow(new TransactionFailed())
	// })

})