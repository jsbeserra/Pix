import CreateAccount from '@application/command/create-account/create-account'
import { CpfAlreadyRegistered } from '@application/errors/command/create-account'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import TypeOrmHelperAdpterMemory from '@test/integration/typeorm/typeorm-adpter-memory'



describe('CreateAccountCommand',() => {
	let databaseConnection:ITypeOrmAdpter
	let accountRepositoryPostgresql:IAccountRepository
	let sut:CreateAccount

	beforeAll(async()=>{
		databaseConnection = new TypeOrmHelperAdpterMemory()
		await databaseConnection.connect()
		accountRepositoryPostgresql = new AccountRepositoryPostgresql(databaseConnection)
		sut = new CreateAccount(accountRepositoryPostgresql)
	})
	
	afterEach(async ()=>{
		await databaseConnection.getAccountEntity().clear()
	})

	afterAll(async ()=>{
		await databaseConnection.disconect()
	})

	it('Should create an account and persist', async () => {
		const input = {
			name:'Fernando da Silva Santos',
			cpf:'701.313.190-35',
			motherName:'Ana Maria Pereira',
			dateOfBirth: '1999-05-15'
		}
		await sut.handle(input)
		const account = await databaseConnection.getAccountEntity().findOneBy({cpf:'70131319035'})
		expect(account.cpf).toBe('70131319035')
		expect(account.name).toBe('Fernando da Silva Santos')
	})

	it('Should fail to create an account with cpf if the cpf already exists', async () => {
		const input = {
			name:'Fernando da Silva Santos',
			cpf:'586.964.410-01',
			motherName:'Ana Maria Pereira',
			dateOfBirth: '1999-05-15'
		}
		await sut.handle(input)
		const input2 = {
			name:'Antonio nogueira',
			cpf:'586.964.410-01',
			motherName:'Ana Maria Pereira',
			dateOfBirth: '1998-05-15'
		}
		expect(async ()=> await sut.handle(input2)).rejects.toThrow(new CpfAlreadyRegistered())
	})
})