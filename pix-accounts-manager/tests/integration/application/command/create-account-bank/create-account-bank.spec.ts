import CreateAccountBank from '@application/command/create-account-bank/create-account-bank'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import BankRepository from '@infra/repository/bank-repository-sql'
import TypeOrmAdpterMemory from '@main/data-base/typeorm/typeorm-adpter-memory'
import {faker} from '@faker-js/faker'
import { BankAlreadyExists } from '@application/errors/use-case/create-account'
describe('Create Account Bank',()=>{
	const databaseConnection = TypeOrmAdpterMemory.getIntance()
	let bankRepository: IBankRepository
	let sut:CreateAccountBank

	beforeAll(async()=>{
		await databaseConnection.connect()
		await databaseConnection.runMigrations()
		bankRepository = new BankRepository(databaseConnection)
		sut = new CreateAccountBank(bankRepository)
	})

	it('Should crete bank account', async ()=>{
		const input = {
			name: faker.person.zodiacSign(),
			url_for_transaction: faker.internet.url(),
			webhook_notification: faker.internet.url()
		}
		await sut.handle(input)
		const [bank] = await databaseConnection.query(`select * from bank where name='${input.name}'`)
		expect(bank.name).toBe(input.name)
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