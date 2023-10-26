
import { PixKeyValueNotFound } from '@application/errors/query/check-accounts-and-bring-the-data-errors'
import ICache from '@application/interfaces/data/cache/icache'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import CheckAccountsAndBringTheData from '@application/query/check-accounts-and-bring-the-data/check-accounts-and-bring-the-data'
import { OutPutcheckAccountsAndBringTheData } from '@application/query/check-accounts-and-bring-the-data/output-check-accounts-and-bring-the-data'
import Account from '@domain/entities/account'
import Bank from '@domain/entities/bank'
import { PixKeyUnacceptedCharacters } from '@domain/errors/value-objects/pix-key-errors'
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


describe('CheckAccountsAndBringTheData',() => {
	let typeormAdpter:ITypeOrmAdpter
	let accountQuery:IAccountQuery
	let accountRepository:IAccountRepository
	let bankRepository: IBankRepository
	let sut:CheckAccountsAndBringTheData
	let cache:ICache

	beforeAll(async()=>{
		await RedisHelper.connect(new Redis())
		typeormAdpter = new TypeOrmHelperAdpterMemory()
		await typeormAdpter.connect()
		bankRepository = new BankRepositoryTypeOrm(typeormAdpter)
		accountRepository = new AccountRepositoryTypeOrm(typeormAdpter)
		accountQuery = new AccountQuery(typeormAdpter)
		cache = new RedisCacheAdpter()
		const cacheExpireIn = 60
		sut = new CheckAccountsAndBringTheData(accountQuery,cache,cacheExpireIn)
	})

	afterEach(async ()=>{
		await typeormAdpter.getAccountEntity().clear()
		await typeormAdpter.getBankEntity().clear()
	})

	afterAll(async ()=>{
		await typeormAdpter.disconect()
	})

	it('Should fail if pix key is invalid', async () => {
		const payer = {
			cpf:'fake_cpf',
			pix_key:'xxxxxx_258',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		const receiver = {
			cpf:'fake_cpf',
			pix_key:'1325sw_ert',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		const input = {
			payer_pix_key:payer.pix_key,
			receiver_pix_key:receiver.pix_key
		}
		await expect(sut.handle(input)).rejects.toThrow(new PixKeyUnacceptedCharacters())
	})

	it('Should return data if payer is cached and receiver is not cached', async () => {
		const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('teste2')
		const accountPayer = Account.create(PixKey.create('Payer'),Cpf.create('573.855.410-89'),bankData!)
		await accountRepository.create(accountPayer)
		const payerInCache = {
			cpf:'fake_cpf',
			pix_key:'xxxxxx258',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		await cache.create(payerInCache.pix_key,JSON.stringify(payerInCache),3000)
		const input = {
			payer_pix_key:payerInCache.pix_key,
			receiver_pix_key:accountPayer.pixKey.value
		}
		const result = await sut.handle(input)
        
		const expectOutput:OutPutcheckAccountsAndBringTheData = {
			receiver:{
				cpf: accountPayer.cpf.value,
				pix_key: accountPayer.pixKey.value,
				url_for_transaction:accountPayer.bank.urlForTransactions.value,
				webhook_notification:accountPayer.bank.url_for_refund.value
			},
			payer:{
				cpf: payerInCache.cpf,
				pix_key: payerInCache.pix_key,
				url_for_transaction:payerInCache.url_for_transaction,
				webhook_notification:payerInCache.webhook_notification
			}
		}
		expect(result).toMatchObject(expectOutput)
	})

	it('Should return data if receiver is cached and payer is not cached', async () => {
		const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('teste2')
		const accountPayer = Account.create(PixKey.create('Payernoca'),Cpf.create('369.054.550-16'),bankData!)
		await accountRepository.create(accountPayer)
		const receiverInCache = {
			cpf:'fake_cpf',
			pix_key:'23598rty',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		await cache.create(receiverInCache.pix_key,JSON.stringify(receiverInCache),3000)
		const input = {
			payer_pix_key:accountPayer.pixKey.value,
			receiver_pix_key:receiverInCache.pix_key
		}
		const result = await sut.handle(input)
        
		const expectOutput:OutPutcheckAccountsAndBringTheData = {
			payer:{
				cpf: accountPayer.cpf.value,
				pix_key: accountPayer.pixKey.value,
				url_for_transaction:accountPayer.bank.urlForTransactions.value,
				webhook_notification:accountPayer.bank.url_for_refund.value
			},
			receiver:{
				cpf: receiverInCache.cpf,
				pix_key: receiverInCache.pix_key,
				url_for_transaction:receiverInCache.url_for_transaction,
				webhook_notification:receiverInCache.webhook_notification
			}
		}
		expect(result).toMatchObject(expectOutput)
	})

	it('Should return data if both keys are cached', async () => {
		const payer = {
			cpf:'fake_cpf',
			pix_key:'xxxxxx258',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		const receiver = {
			cpf:'fake_cpf',
			pix_key:'1325swert',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		await cache.create(payer.pix_key,JSON.stringify(payer),3000)
		await cache.create(receiver.pix_key,JSON.stringify(receiver),3000)
		const input = {
			payer_pix_key:payer.pix_key,
			receiver_pix_key:receiver.pix_key
		}
		const result = await sut.handle(input)
		const expectOutput:OutPutcheckAccountsAndBringTheData = {
			payer:payer,
			receiver:receiver
		}
		expect(result).toMatchObject(expectOutput)
	})
	it('Should return data if both keys are not cached', async () => {
		const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('teste2')
		const accountPayer = Account.create(PixKey.create('xlllop00'),Cpf.create('032.952.680-45'),bankData!)
		const accountReceiver = Account.create(PixKey.create('000tyuiop'),Cpf.create('908.499.080-35'),bankData!)
		await accountRepository.create(accountPayer)
		await accountRepository.create(accountReceiver)
		const input = {
			payer_pix_key:accountPayer.pixKey.value,
			receiver_pix_key:accountReceiver.pixKey.value
		}
		const result = await sut.handle(input)
		const expectOutput:OutPutcheckAccountsAndBringTheData = {
			payer:{
				cpf: accountPayer.cpf.value,
				pix_key: accountPayer.pixKey.value,
				url_for_transaction:accountPayer.bank.urlForTransactions.value,
				webhook_notification:accountPayer.bank.url_for_refund.value
			},
			receiver:{
				cpf: accountReceiver.cpf.value,
				pix_key: accountReceiver.pixKey.value,
				url_for_transaction:accountReceiver.bank.urlForTransactions.value,
				webhook_notification:accountReceiver.bank.url_for_refund.value
			}
		}
		expect(result).toMatchObject(expectOutput)
	})
	it('should fail if there is no receiver pix key', async () => {
		const payer_pix_key = '458sadert'
		const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('teste2')
		const account = Account.create(PixKey.create(payer_pix_key),Cpf.create('990.650.830-22'),bankData!)
		await accountRepository.create(account)
		const payer = {
			cpf:'99065083022',
			pix_key:payer_pix_key,
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		const receiver = {
			cpf:'fake_cpf',
			pix_key:'xx897ppp',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		const input = {
			payer_pix_key:payer.pix_key,
			receiver_pix_key:receiver.pix_key
		}
		await expect(sut.handle(input)).rejects.toThrow(new PixKeyValueNotFound(receiver.pix_key))
	})

	it('Should fail if there is no payer pix key', async () => {
		const receiver_pix_key = '1325xxxx'
		const bank = Bank.create('teste3', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('teste3')
		const account = Account.create(PixKey.create(receiver_pix_key),Cpf.create('376.259.210-18'),bankData!)
		await accountRepository.create(account)
		const input = {
			payer_pix_key:'123s5frtyf',
			receiver_pix_key:receiver_pix_key
		}
		await expect(sut.handle(input)).rejects.toThrow(new PixKeyValueNotFound(input.payer_pix_key))
	})
	
	it('Should return data if both keys are cached', async () => {
		const receiver_pix_key = '1325sftgg'
		const bank = Bank.create('testepayed', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankData = await bankRepository.findByName('testepayed')
		const account = Account.create(PixKey.create(receiver_pix_key),Cpf.create('464.932.950-76'),bankData!)
		await accountRepository.create(account)
		const payer = {
			cpf:'fake_cpf',
			pix_key:'98541dfty',
			url_for_transaction:'fake_url',
			webhook_notification:'fake_url',
		}
		const receiver = {
			cpf:account.cpf.value,
			pix_key:receiver_pix_key,
			url_for_transaction:account.bank.urlForTransactions.value,
			webhook_notification:account.bank.url_for_refund.value,
		}
		await cache.create(payer.pix_key,JSON.stringify(payer),3000)
		const input = {
			payer_pix_key:payer.pix_key,
			receiver_pix_key:receiver_pix_key
		}
		const result = await sut.handle(input)
		const expectOutput:OutPutcheckAccountsAndBringTheData = {
			payer:payer,
			receiver:receiver
		}
		expect(result).toMatchObject(expectOutput)
	})

})