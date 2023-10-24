import { TransactionNotFound } from '@application/errors/application-shared-errors'
import GetTransactionStatus from '@application/use-case/get-transaction-status/get-transaction-status'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import TypeOrmHelperAdpterMemory from '@test/main/typeorm/typeorm-adpter-memory'

describe('GetTransactionStatus', ()=>{
	let typeOrmHelperAdpterMemory:ITypeOrmAdpter
	let transactionRepositoryTypeOrm:TransactionRepositoryTypeOrm
	let sut:GetTransactionStatus

	beforeAll(async ()=>{
		typeOrmHelperAdpterMemory = new TypeOrmHelperAdpterMemory()
		await typeOrmHelperAdpterMemory.connect()
		transactionRepositoryTypeOrm = new TransactionRepositoryTypeOrm(typeOrmHelperAdpterMemory)
		sut =new GetTransactionStatus(transactionRepositoryTypeOrm)
	})
    
	afterEach(async ()=>{
		await typeOrmHelperAdpterMemory.getTransactionEntity().clear()
	})

	afterAll(async ()=>{
		await typeOrmHelperAdpterMemory.disconect()
	})
    
	it('Should look for an transaction',async ()=>{
		const code = '123asdwert'
		const account = typeOrmHelperAdpterMemory.getTransactionEntity().create({
			code:code,
			payer_pix_key:'fake_pix',
			receiver_pix_key:'fake_pix',
			value:100,
			status:'pending'
		})
		await typeOrmHelperAdpterMemory.getTransactionEntity().save(account)
		const transaction = await sut.handle(code)
		expect(transaction).toMatchObject({status: 'pending'})
	})

	it('Should fail when fetching a non-existent transaction',async ()=>{
		const code = 'fake_code'
		expect(async ()=> await sut.handle(code)).rejects.toThrow(new TransactionNotFound())
	})
	
})