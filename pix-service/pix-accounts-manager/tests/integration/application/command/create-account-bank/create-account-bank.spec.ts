import CreateAccountBank from '@application/command/create-account-bank/create-account-bank'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import {faker} from '@faker-js/faker'
import { BankAlreadyExists } from '@application/errors/use-case/create-account'
import TypeOrmHelperAdpterMemory from '@test/integration/typeorm/typeorm-adpter-memory'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import BankRepositoryTypeOrm from '@infra/repository/bank-repository-typeorm'


describe('Create Account Bank',()=>{
	let bankRepository: IBankRepository
	let sut:CreateAccountBank
	let typeormAdpter:ITypeOrmAdpter

	beforeAll(async()=>{
		typeormAdpter = new TypeOrmHelperAdpterMemory()
		await typeormAdpter.connect()
		bankRepository = new BankRepositoryTypeOrm(typeormAdpter)
		sut = new CreateAccountBank(bankRepository)
	})

	afterAll(async ()=>{
		await typeormAdpter.getBankEntity().clear()
		await typeormAdpter.disconect()
	})

	it('Should crete bank account', async ()=>{
		const input = {
			name: faker.person.zodiacSign(),
			url_for_transaction: faker.internet.url(),
			webhook_notification: faker.internet.url()
		}
		await sut.handle(input)
		const bank = await bankRepository.findByName(input.name)
		expect(input.name).toBe(bank?.name)
	})

	it('Should fail when creating banks with repeated names', async ()=>{
		const input = {
			name: 'repeated name',
			url_for_transaction: faker.internet.url(),
			webhook_notification: faker.internet.url()
		}
		await sut.handle(input)
		await expect(sut.handle(input)).rejects.toThrow(new BankAlreadyExists())
	})
})