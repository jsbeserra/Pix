import { InvalidDomain, InvalidProtocol } from '@domain/errors/value-objects/urlFotTranscations'
import Url from '@domain/value-objects/url'

describe('Url',()=>{
	it('Should fail create url if not contains protocol',()=>{
		expect(()=> Url.create('www.teste.com.br')).toThrow(new InvalidProtocol())
	})

	it('Should fail create url if not contains domain',()=>{
		expect(()=> Url.create('http://')).toThrow(new InvalidDomain())
	})
})