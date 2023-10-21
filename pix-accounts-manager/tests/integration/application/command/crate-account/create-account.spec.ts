import CreateAccount from '@application/command/create-account/create-account'
import { BankNotFoundAlreadyRegistered, CpfAlreadyRegistered, PixKeyAlreadyRegistered } from '@application/errors/use-case/create-account'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import { faker } from '@faker-js/faker'
import AccountRepository from '@infra/repository/Accout-repository-sql'

import BankRepository from '@infra/repository/bank-repository-sql'
import TypeOrmAdpterMemory from '@main/data-base/typeorm/typeorm-adpter-memory'



describe('CreateAccount',() => {
	const databaseConnection = TypeOrmAdpterMemory.getIntance()
	let accountRepository:IAccountRepository
	let bankRepository: IBankRepository
	let sut:CreateAccount

	beforeAll(async()=>{
		await databaseConnection.connect()
		await databaseConnection.runMigrations()
		bankRepository = new BankRepository(databaseConnection)
		accountRepository = new AccountRepository(databaseConnection)
		sut = new CreateAccount(accountRepository,bankRepository)
	})


	it('Should create an account and persist', async () => {
		await databaseConnection.save('insert into bank (name, url_for_transaction, webhook_notification) VALUES (?, ?, ?)',['x','x','x'])
		const [bankid] = await databaseConnection.query('select * from bank')
		const input = {
			bank_id:bankid.id,
			cpf:'70131319035',
			pix_key:'1xxxxxd58d'
		}
		await sut.handle(input)
		const accounts = await databaseConnection.query('select * from account')
		expect(accounts[0].cpf).toBe('70131319035')
		expect(accounts.length).toBe(1)
	})

	it('Should fail to create a pix account if the bank id does not exist', async () => {
		const input = {
			bank_id: '90',
			cpf:'835.049.920-69',
			pix_key:'123456asd'
		}
		expect(async()=>await sut.handle(input)).rejects.toThrow(new BankNotFoundAlreadyRegistered())
	})

	it('Should create fail account with cpf already existis', async () => {
		await databaseConnection.save('insert into bank (name, url_for_transaction, webhook_notification) VALUES (?, ?, ?)',['teste','teste','teste'])
		const [bank] = await databaseConnection.query('select * from bank')
		await databaseConnection.save('INSERT INTO account (cpf, bank_id, pix_key) VALUES (?, ?, ?)',['84402820014',bank.id, 'xts2365ss'])
		const input = {
			bank_id:bank.id!,
			cpf:'844.028.200-14',
			pix_key:'1xxxxxd58d'
		}
		await expect(sut.handle(input)).rejects.toThrow(new CpfAlreadyRegistered())
	})

	it('Should fail to create a pix account if the pix_key already exists', async () => {
		const bankName = faker.person.firstName()
		await databaseConnection.save('insert into bank (name, url_for_transaction, webhook_notification) VALUES (?, ?, ?)',[bankName,faker.internet.url(),faker.internet.url()])
		const [bankid] = await databaseConnection.query(`select id from bank where name='${bankName}'`)
		await databaseConnection.save('INSERT INTO account (cpf, bank_id, pix_key) VALUES (?, ?, ?)',['93376796041', bankid.id, 'xts2365ss'])
		const input = {
			bank_id: bankid.id,
			cpf:'913.548.790-90',
			pix_key:'xts2365ss'
		}
		await expect(sut.handle(input)).rejects.toThrow(new PixKeyAlreadyRegistered())
	})

})