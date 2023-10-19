import { DateOfBirthErrorMaximumAge, DateOfBirthErrorMinimumAge, InvalidDateOfBirth } from '@domain/errors/value-objects'
import DateOfBirth from '@domain/value-objects/date-of-birth'


describe('Test DateOfBirth',()=>{
	it('Should test create valid DateOfBirth',()=>{
		const dateOfBirth = DateOfBirth.create('1999-05-15')
		expect(dateOfBirth.value).toBeDefined()
	})

	it('Should fail if the date of birth is less than the minimum age',()=>{
		const currentDate = new Date()
		expect(()=> DateOfBirth.create(currentDate.toString())).toThrow(new DateOfBirthErrorMinimumAge(18))
	})

	it('Should test a invalid date',()=>{
		expect(() => DateOfBirth.create('xxxx')).toThrow(new InvalidDateOfBirth())
	})

	it('Should test a date greater than human life expectancy',()=>{
		expect(() => DateOfBirth.create('1700-05-15')).toThrow(new DateOfBirthErrorMaximumAge())
	})

	it('Should restore a DateOfBirth',()=>{
		const dateOfBirth = DateOfBirth.restore('2020-05-15')
		expect(dateOfBirth.value).toBeDefined()
	})
})


