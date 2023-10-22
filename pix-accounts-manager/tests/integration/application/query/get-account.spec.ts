import { PixKeyNotFound } from '@application/errors/application-error'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import GetAccount from '@application/query/get-account/get-account'
import Account from '@domain/entities/account'
import Bank from '@domain/entities/bank'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import Url from '@domain/value-objects/url'
import { faker } from '@faker-js/faker'
import AccountQuery from '@infra/query/get-account-query'
import AccountRepository from '@infra/repository/Accout-repository-sql'
import BankRepository from '@infra/repository/bank-repository-sql'
import { TypeOrmHelper } from '@main/data-base/typeorm/tyepeorm.helper'



describe('GetAccount',() => {
	let accountQuery:IAccountQuery
	let accountRepository:IAccountRepository
	let bankRepository: IBankRepository
	let sut:GetAccount

	beforeAll(async()=>{
		await TypeOrmHelper.connect()
		bankRepository = new BankRepository()
		accountRepository = new AccountRepository()
		accountQuery = new AccountQuery()
		sut = new GetAccount(accountQuery)
	})

	afterEach(async ()=>{
		await TypeOrmHelper.getAccountEntity().clear()
		await TypeOrmHelper.getBankEntity().clear()
	})

	afterAll(async ()=>{
		await TypeOrmHelper.disconect()
	})

	it('Should look for a pix account', async () => {
		const url_for_transaction = faker.internet.url()
		const webhook_notification = faker.internet.url()
		const bankObject = Bank.create('teste2', Url.create(url_for_transaction),Url.create(webhook_notification))
		await bankRepository.create(bankObject)
		const bank = await bankRepository.findByName('teste2')
		const input = {
			pix_key:'1xxxxxd58d'
		}
		await accountRepository.create(Account.create(PixKey.create(input.pix_key),Cpf.create('644.750.060-66'),bank!))	
		await accountRepository.create(Account.create(PixKey.create('123sertyu'),Cpf.create('199.922.710-78'),bank!))	
		const account = await sut.handle(input.pix_key)
		expect(account.cpf).toBe('64475006066')
		expect(account.pix_key).toBe(input.pix_key)
		expect(account.url_for_transaction).toBe(url_for_transaction)
		expect(account.webhook_notification).toBe(webhook_notification)
	})

	it('Should fail if it doesnt find a pix key', async () => {
		const input = {
			pix_key:'58s9f4gty'
		}
		await expect(sut.handle(input.pix_key)).rejects.toThrow(new PixKeyNotFound())
	})

})