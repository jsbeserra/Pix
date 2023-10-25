import ProcessTransaction from '@application/use-case/process-transaction/process-transaction'
import Transaction from '@domain/transaction'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import FakeProcessTransactionGateway from '@test/fake/fake-process-transaction-gateway'
import TypeOrmHelperAdpterMemory from '@test/main/typeorm/typeorm-adpter-memory'


describe('ProcessTransaction',()=>{
	let typeOrmHelperAdpterMemory:ITypeOrmAdpter
	let transactionRepositoryTypeOrm:TransactionRepositoryTypeOrm
	let sut:ProcessTransaction
	let accountGateway:FakeProcessTransactionGateway
	
	beforeAll(async ()=>{
		typeOrmHelperAdpterMemory = new TypeOrmHelperAdpterMemory()
		await typeOrmHelperAdpterMemory.connect()
		transactionRepositoryTypeOrm = new TransactionRepositoryTypeOrm(typeOrmHelperAdpterMemory)
		accountGateway = new FakeProcessTransactionGateway()

		sut = new ProcessTransaction(accountGateway,transactionRepositoryTypeOrm)
	})
    
	afterEach(async ()=>{
		await typeOrmHelperAdpterMemory.getTransactionEntity().clear()
	})

	afterAll(async ()=>{
		await typeOrmHelperAdpterMemory.disconect()
	})

	it('Should proccess transaction', async()=>{
		const transaction = Transaction.create('fakecode','4589sert','89563as',200,'pending')
		await transactionRepositoryTypeOrm.save(transaction)
		const input = {
			payer:{
				cpf:'531.263.690-81',
				pix_key:'asasdeer',
				url_for_transaction:'http://fake.com',
				webhook_notification:'http://fake.com'
			},
			receiver:{
				cpf:'725.534.900-54',
				pix_key:'asasdeer',
				url_for_transaction:'http://fake.com',
				webhook_notification:'http://fake.com'
			},
			value:500,
			code:'fakecode'
		}
		const result = await sut.handle(input)
		expect(result).toBeUndefined()
	})

	it('Should fail proccess transaction if the gateway returns error', async()=>{
		const spy = jest.spyOn(accountGateway,'exec')
		spy.mockRejectedValue(new Error('fake error'))
		const input = {
			payer:{
				cpf:'531.263.690-81',
				pix_key:'asasdeer',
				url_for_transaction:'http://fake.com',
				webhook_notification:'http://fake.com'
			},
			receiver:{
				cpf:'725.534.900-54',
				pix_key:'asasdeer',
				url_for_transaction:'http://fake.com',
				webhook_notification:'http://fake.com'
			},
			value:500,
			code:'fakecode'
		}
		await expect(sut.handle(input)).rejects.toThrow(new Error('fake error'))
	})

	it('Should fail proccess transaction if transaction does not exist in the database', async()=>{
		const input = {
			payer:{
				cpf:'531.263.690-81',
				pix_key:'asasdeer',
				url_for_transaction:'http://fake.com',
				webhook_notification:'http://fake.com'
			},
			receiver:{
				cpf:'725.534.900-54',
				pix_key:'asasdeer',
				url_for_transaction:'http://fake.com',
				webhook_notification:'http://fake.com'
			},
			value:500,
			code:'99999'
		}
		await expect(sut.handle(input)).rejects.toThrow(new Error('Transaction not found'))
	})

})