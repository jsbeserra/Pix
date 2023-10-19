import { NameAllowedCharacters, NameContainsNumbers } from '@domain/errors/value-objects'
import FullName from '@domain/value-objects/full-name'


describe('Test FullName',()=>{
	it.each(['Seraphina Aurora Nightshade','Liora Frostfall','Aëlysia Coeur-d\'Or','Théo Rêveur-Étoile'])('Should create a cpf valid %s', function (value) {
		const fullName = FullName.create(value)
		expect(fullName.value).toBeDefined()
		expect(fullName.value).toBe(value)
	})

	it('Should test a full name that is invalid because it has invalid characteres',()=> {
		const fullnameInput = 'Calista 0ceana Mystere 23'
		expect(()=>FullName.create(fullnameInput)).toThrow(new NameContainsNumbers('FullName'))
	})

	it('Should test a full name that is invalid because it contains numbers',()=> {
		const fullnameInput = 'Calista @ceana Mystere'
		expect(()=>FullName.create(fullnameInput)).toThrow(new NameAllowedCharacters('FullName'))
	})

	it('Should test restore name',()=>{
		const fakename = 'Octavius Orion Thunderstrike'
		const fullName = FullName.restore(fakename)
		expect(fullName.value).toBeDefined()
		expect(fullName.value).toBe(fakename)
	})
})


