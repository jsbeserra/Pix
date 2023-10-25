import RegisterTransaction from '@application/use-case/register-transaction/register-transaction'
import UuidApter from '@infra/adpters/uuid-adpter'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import TransactionRepositoryTypeOrm from '@infra/repository/Accout-repository-typeorm'
import FakeGetAccountGateway from '@test/fake/fake-get-account-gateway'
import FakeQueueClientAdpter from '@test/fake/fake-queue-adpter'
import TypeOrmHelperAdpterMemory from '@test/main/typeorm/typeorm-adpter-memory'


describe('RegisterTransaction',()=>{
	let typeOrmHelperAdpterMemory:ITypeOrmAdpter
	let transactionRepositoryTypeOrm:TransactionRepositoryTypeOrm
	let sut:RegisterTransaction
	let accountGateway:FakeGetAccountGateway
	
	beforeAll(async ()=>{
		typeOrmHelperAdpterMemory = new TypeOrmHelperAdpterMemory()
		await typeOrmHelperAdpterMemory.connect()
		transactionRepositoryTypeOrm = new TransactionRepositoryTypeOrm(typeOrmHelperAdpterMemory)
		accountGateway = new FakeGetAccountGateway()
		const queue = FakeQueueClientAdpter.getInstance()
		const createCode = new UuidApter()
		sut = new RegisterTransaction(accountGateway,queue,createCode,transactionRepositoryTypeOrm)
	})
    
	afterEach(async ()=>{
		await typeOrmHelperAdpterMemory.getTransactionEntity().clear()
	})

	afterAll(async ()=>{
		await typeOrmHelperAdpterMemory.disconect()
	})

	it('Should proccess transaction', async()=>{
		const input = {
			payer_pix_key:'4589sert',
			receiver_pix_key:'89563as',
			value:200
		}
		const result = await sut.handle(input)
		expect(result).toBeTruthy()
	})

	it('Should failsproccess transaction', async()=>{
		const spy = jest.spyOn(accountGateway,'exec')
		spy.mockRejectedValue(new Error('fake error'))
		const input = {
			payer_pix_key:'4589sert',
			receiver_pix_key:'89563as',
			value:200
		}
		await expect(sut.handle(input)).rejects.toThrow(new Error('fake error'))
	})

})