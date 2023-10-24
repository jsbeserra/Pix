import Cpf from '@domain/value-objects/cpf'
import { InvalidCpf } from '@domain/errors/value-objects'

describe('Test Cpf',()=>{

	test.each(['340.962.240-30', '706.409.590-40', '204.065.400-39'])(
		'Should create a cpf valid %s',
		function (value) {
			const cpf = Cpf.create(value)
			expect(cpf.value).toBeDefined()
		}
	)

	test.each(['111.111.111-11', '222.222.222-22', '333.333.3336-33'])(
		'Should test an invalid cpf: %s',
		(value) => {
			expect(() => Cpf.create(value)).toThrow(new InvalidCpf())
		}
	)

	it('Should restore a cpf',()=>{
		const cpf = Cpf.restore('706.409.590-40')
		expect(cpf.value).toBeDefined()
	})
})