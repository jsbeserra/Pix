import CreateAccount from '@application/command/create-account/create-account'
import { CpfAlreadyRegistered } from '@application/errors/command/create-account'
import AccountRepositoryPostgresql from '@infra/data/Accout-repository-sql'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import KnexAdpter from '@main/data-base/knex/adpters/knex-adpter'
import KnexAdpterSqlite3 from '@main/data-base/knex/adpters/knex-adpter-sqlite3'


describe('CreateAccountCommand',() => {
	let databaseConnection:KnexAdpter
	let accountRepositoryPostgresql:IAccountRepository
	let sut:CreateAccount

	beforeAll(async()=>{
		databaseConnection = new KnexAdpterSqlite3('development')
		await databaseConnection.connect()
		accountRepositoryPostgresql = new AccountRepositoryPostgresql(databaseConnection)
		sut = new CreateAccount(accountRepositoryPostgresql)
	})
	
	afterAll(async () => {
		// Feche a conexão com o banco de dados após todos os testes
		//await databaseConnection.close()

	})

	it('Should create an account and persist', async () => {
		const input = {
			name:'Fernando da Silva Santos',
			cpf:'701.313.190-35',
			motherName:'Ana Maria Pereira',
			dateOfBirth: '1999-05-15'
		}
		await sut.handle(input)
		const accounts:{ cpf: string, name: string }[] = await databaseConnection.query('select * from accounts')
		console.log(await databaseConnection.query('select * from accounts'))
		expect(accounts[0].cpf).toBe('70131319035')
		expect(accounts[0].name).toBe('Fernando da Silva Santos')
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
		const boga = await databaseConnection.query('select * from accounts')
		console.log(boga)
		expect(async ()=> await sut.handle(input2)).rejects.toThrow(new CpfAlreadyRegistered())
	})
})