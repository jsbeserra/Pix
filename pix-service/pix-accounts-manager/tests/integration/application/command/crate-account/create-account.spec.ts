import CreateAccount from '@application/command/create-account/create-account'
import { BankNotFoundAlreadyRegistered, CpfAlreadyRegistered, PixKeyAlreadyRegistered } from '@application/errors/use-case/create-account'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import Bank from '@domain/entities/bank'
import Cpf from '@domain/value-objects/cpf'
import Url from '@domain/value-objects/url'
import { faker } from '@faker-js/faker'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import AccountRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import BankRepositoryTypeOrm from '@infra/repository/bank-repository-typeorm'
import TypeOrmHelperAdpterMemory from '@test/integration/typeorm/typeorm-adpter-memory'



describe('CreateAccount',() => {
	let typeormAdpter:ITypeOrmAdpter
	let accountRepository:IAccountRepository
	let bankRepository: IBankRepository
	let sut:CreateAccount

	beforeAll(async()=>{
		typeormAdpter = new TypeOrmHelperAdpterMemory()
		await typeormAdpter.connect()
		bankRepository = new BankRepositoryTypeOrm(typeormAdpter)
		accountRepository = new AccountRepositoryTypeOrm(typeormAdpter)
		sut = new CreateAccount(accountRepository,bankRepository)
	})


	afterEach(async ()=>{
		await typeormAdpter.getAccountEntity().clear()
		await typeormAdpter.getBankEntity().clear()
	})

	afterAll(async ()=>{
		await typeormAdpter.disconect()
	})

	it('Should create an account and persist', async () => {
		const bank = Bank.create('teste2', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankid = await bankRepository.findByName('teste2')
		const input = {
			bank_id:bankid!.id!,
			cpf:'70131319035',
			pix_key:'1xszxxd58d'
		}
		await sut.handle(input)
		const accounts = await accountRepository.existsCpf(Cpf.restore('70131319035'))
		expect(accounts).toBe(true)
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
		const bank = Bank.create('teste5', Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankid = await bankRepository.findByName('teste5')
		const input = {
			bank_id:bankid!.id!,
			cpf:'844.028.200-14',
			pix_key:'1xxxxxd58d'
		}
		await sut.handle(input)
		expect(async()=>await sut.handle(input)).rejects.toThrow(new CpfAlreadyRegistered())
	})

	it('Should fail to create a pix account if the pix_key already exists', async () => {
		const bankName = faker.person.firstName()
		const bank = Bank.create(bankName, Url.create(faker.internet.url()),Url.create(faker.internet.url()))
		await bankRepository.create(bank)
		const bankid = await bankRepository.findByName(bankName)
		const input = {
			bank_id: bankid!.id!,
			cpf:'965.402.280-07',
			pix_key:'9ts2365sv'
		}
		const input2 = {
			bank_id: bankid!.id!,
			cpf:'032.932.780-19',
			pix_key:'9ts2365sv'
		}
		await sut.handle(input)
		await expect(sut.handle(input2)).rejects.toThrow(new PixKeyAlreadyRegistered())
	})

})