import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import {faker} from '@faker-js/faker'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import AccountQuery from '@infra/query/get-account-query'
import DeleteAccount from '@application/command/delete-pix-key/delete.pix-key'
import Bank from '@domain/entities/bank'
import Url from '@domain/value-objects/url'
import Account from '@domain/entities/account'
import PixKey from '@domain/value-objects/pix-key'
import Cpf from '@domain/value-objects/cpf'
import { PixKeyNotFound } from '@application/errors/application-error'
import { RedisHelper } from '@main/data-base/redis/redis.helper'
import ICache from '@application/interfaces/data/cache/icache'
import Redis from 'ioredis-mock'
import RedisCacheAdpter from '@infra/adpters/redis-cache-adpter'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import TypeOrmHelperAdpterMemory from '@test/integration/typeorm/typeorm-adpter-memory'
import BankRepositoryTypeOrm from '@infra/repository/bank-repository-typeorm'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'


describe('Delete PixKey',()=>{
	let typeormAdpter:ITypeOrmAdpter
	let accountQuery:IAccountQuery
	let accountRepository:IAccountRepository
	let bankRepository: IBankRepository
	let sut:DeleteAccount
	let cache:ICache
	
	beforeAll(async()=>{
		await RedisHelper.connect(new Redis())
		typeormAdpter = new TypeOrmHelperAdpterMemory()
		await typeormAdpter.connect()
		bankRepository = new BankRepositoryTypeOrm(typeormAdpter)
		accountRepository = new AccountRepositoryTypeOrm(typeormAdpter)
		accountQuery = new AccountQuery(typeormAdpter)
		cache = new RedisCacheAdpter()
		sut = new DeleteAccount(accountQuery,accountRepository,cache)
	})

	afterEach(async ()=>{
		await typeormAdpter.getAccountEntity().clear()
		await typeormAdpter.getBankEntity().clear()
	})

	afterAll(async ()=>{
		await typeormAdpter.disconect()
	})

	it('Should delete PixKey', async ()=>{
		const pix_key = '458sadert'
		const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('teste2')
		await cache.create(pix_key,'fake payload',3000)
		const account = Account.create(PixKey.create(pix_key),Cpf.create('990.650.830-22'),bankData!)
		await accountRepository.create(account)
		await expect(sut.handle(pix_key)).resolves.toBeUndefined()
		const cachedAccount = await cache.find(pix_key)
		expect(cachedAccount).toBeNull()
	})

	it('Should fail if pix key not found', async ()=>{
		const pix_key = '0xc00007b'
		await expect(sut.handle(pix_key)).rejects.toThrow(new PixKeyNotFound())
	})
})