import { PixKeyMaximumLength, PixKeyMinimumLength, PixKeyUnacceptedCharacters } from '@domain/errors/value-objects/pix-key-errors'
import PixKey from '@domain/value-objects/pix-key'


describe('Test PixKey',()=>{

	it('Should create a valid pix key',()=> {
		const pixkeyInput = '12345ACVs'
		const pixKey = PixKey.create(pixkeyInput)
		expect(pixKey.value).toBeDefined()
		expect(pixKey.value).toBe(pixkeyInput)
	})

	it('Should fail if pix key is less than 5 characters long',()=> {
		const pixkeyInput = '123'
		expect(()=> PixKey.create(pixkeyInput)).toThrow(new PixKeyMinimumLength(5))
	})

	it('Should fail when creating pix key with unaccepted characters',()=> {
		const pixkeyInput = '@@@#$%¨&'
		expect(()=> PixKey.create(pixkeyInput)).toThrow(new PixKeyUnacceptedCharacters())
	})

	it('Should restore pix key',()=> {
		const pixkeyInput = '123aaaAAXX'
		const pixKey = PixKey.restore(pixkeyInput)
		expect(pixKey.value).toBe(pixkeyInput)
	})

	it('Should fail if pix key contains more than 10 characters',()=> {
		const pixkeyInput = '123aaaAAXXXXXçSSSSSSS'
		expect(()=> PixKey.create(pixkeyInput)).toThrow(new PixKeyMaximumLength(10))
	})

})


