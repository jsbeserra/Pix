import Cpf from '@domain/value-objects/cpf'
import { CpfAllDigitsAreTheSame, CpfInvalidDigit, InvalidCpfLength } from '@domain/errors/value-objects'

describe('Test Cpf',()=>{

	it('Should fail if the digit is invalid',()=>{
		const cpf = '733.344.266-33'
		expect(() => Cpf.create(cpf)).toThrow(new CpfInvalidDigit())
	})
	it('Should fail if the cpf does not have 11 digits',()=>{
		const cpf = '111.111.1-11'
		expect(() => Cpf.create(cpf)).toThrow(new InvalidCpfLength())
	})

	it('Should fail if the cpf has all the numbers repeated',()=>{
		const cpf = '111.111.111-11'
		expect(() => Cpf.create(cpf)).toThrow(new CpfAllDigitsAreTheSame())
	})

	it('Should restore a cpf',()=>{
		const cpf = Cpf.restore('706.409.590-40')
		expect(cpf.value).toBeDefined()
	})
})