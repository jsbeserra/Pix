import { PixKeyNotFound } from '@application/errors/application-error'
import ICache from '@application/interfaces/data/cache/icache'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import GetPixKey from '@application/query/get-account/get-account'
import Account from '@domain/entities/account'
import Bank from '@domain/entities/bank'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import Url from '@domain/value-objects/url'
import { faker } from '@faker-js/faker'
import RedisCacheAdpter from '@infra/adpters/redis-cache-adpter'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import AccountQuery from '@infra/query/get-account-query'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import BankRepositoryTypeOrm from '@infra/repository/bank-repository-typeorm'
import { RedisHelper } from '@main/data-base/redis/redis.helper'
import TypeOrmHelperAdpterMemory from '@test/integration/typeorm/typeorm-adpter-memory'
import Redis from 'ioredis-mock'



describe('GetAccount',() => {
	let accountQuery:IAccountQuery
	let accountRepository:IAccountRepository
	let bankRepository: IBankRepository
	let sut:GetPixKey
	let cache:ICache
	let typeormAdpter:ITypeOrmAdpter

	beforeAll(async()=>{
		await RedisHelper.connect(new Redis())
		typeormAdpter = new TypeOrmHelperAdpterMemory()
		await typeormAdpter.connect()
		bankRepository = new BankRepositoryTypeOrm(typeormAdpter)
		accountRepository = new AccountRepositoryTypeOrm(typeormAdpter)
		accountQuery = new AccountQuery(typeormAdpter)
		cache = new RedisCacheAdpter()
		const cacheExpireIn = 60
		sut = new GetPixKey(accountQuery,cache,cacheExpireIn)
	})

	afterEach(async ()=>{
		await typeormAdpter.getAccountEntity().clear()
		await typeormAdpter.getBankEntity().clear()
	})

	afterAll(async ()=>{
		await typeormAdpter.disconect()
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
		await accountRepository.createAccount(Account.create(PixKey.create(input.pix_key),Cpf.create('644.750.060-66'),bank!))	
		await accountRepository.createAccount(Account.create(PixKey.create('123sertyu'),Cpf.create('199.922.710-78'),bank!))	
		const account = await sut.handle(input.pix_key)
		expect(account.cpf).toBe('64475006066')
		expect(account.pix_key).toBe(input.pix_key)
	})

	it('Should return the cached account', async () => {
		const url_for_transaction = faker.internet.url()
		const webhook_notification = faker.internet.url()
		const bankObject = Bank.create('teste2', Url.create(url_for_transaction),Url.create(webhook_notification))
		await bankRepository.create(bankObject)
		const bank = await bankRepository.findByName('teste2')
		const input = {
			pix_key:'888888aaa'
		}
		const account = Account.create(PixKey.create(input.pix_key),Cpf.create('049.459.470-58'),bank!)
		await accountRepository.createAccount(account)
		const cacheData = {
			cpf:account.cpf.value,
			pix_key:account.pixKey.value
		}
		await cache.create(input.pix_key,JSON.stringify(cacheData),3000)		
		const result = await sut.handle(input.pix_key)
		expect(result.cpf).toBe('04945947058')
		expect(result.pix_key).toBe(input.pix_key)
	})

	it('Should fail if it doesnt find a pix key', async () => {
		const input = {
			pix_key:'58s9f4gty'
		}
		await expect(sut.handle(input.pix_key)).rejects.toThrow(new PixKeyNotFound())
	})

})