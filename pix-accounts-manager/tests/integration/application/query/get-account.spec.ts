import { PixKeyNotFound } from '@application/errors/use-case/get-account'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import GetAccount from '@application/query/get-account/get-account'
import AccountQuery from '@infra/query/get-account-query'
import TypeOrmAdpterMemory from '@main/data-base/typeorm/typeorm-adpter-memory'



describe('GetAccount',() => {
	const databaseConnection = TypeOrmAdpterMemory.getIntance()
	let accountQuery:IAccountQuery
	let sut:GetAccount

	beforeAll(async()=>{
		await databaseConnection.connect()
		await databaseConnection.runMigrations()
		accountQuery = new AccountQuery(databaseConnection)
		sut = new GetAccount(accountQuery)
	})



	it('Should look for a pix account', async () => {

		await databaseConnection.save('insert into bank (name, url_for_transaction, webhook_notification) VALUES (?, ?, ?)',['x','x','x'])
		const [bank] = await databaseConnection.query('select id from bank')
		await databaseConnection.save('INSERT INTO account (cpf, bank_id, pix_key) values (?,?,?)', ['70131319035', bank.id, '1xxxxxd58d'])
		const input = {
			pix_key:'1xxxxxd58d'
		}
		const account = await sut.handle(input.pix_key)
		expect(account.cpf).toBe('70131319035')
	})

	it('Should fail if it doesnt find a pix key', async () => {
		const input = {
			pix_key:'58s9f4gty'
		}
		await expect(sut.handle(input.pix_key)).rejects.toThrow(new PixKeyNotFound())
	})

})