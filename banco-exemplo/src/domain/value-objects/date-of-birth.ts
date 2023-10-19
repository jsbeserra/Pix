import { DateOfBirthErrorMaximumAge, DateOfBirthErrorMinimumAge, InvalidDateOfBirth } from '../errors/value-objects'

export default class DateOfBirth {

	private static maximumAgeReachedByAhuman:number = 120
	private static minimumAge: number = 18
	readonly value:Date

	private constructor(private date:string) {
		this.value = new Date(date)
	}

	public static create(age:string): DateOfBirth{
		this.validate(age)
		return new DateOfBirth(age)
	}
	
	public static restore(age:string): DateOfBirth{
		return new DateOfBirth(age)
	}
    
	private static validate(age:string): void {
		if (!this.isValidDate(age)) throw new InvalidDateOfBirth()
		if (!this.haveAMinimumAge(age)) throw new DateOfBirthErrorMinimumAge(this.minimumAge)
		if (this.TheBirthDateEnteredIsGreaterThanTheHumanLifeExpectancy(age)) throw new DateOfBirthErrorMaximumAge()
	}

	private static isValidDate(age:string){
		return new Date(age).valueOf() ? true : false
	}

	private static haveAMinimumAge (age:string): boolean {
		const years = this.calculateAge(age)
		return years >= this.minimumAge
	}

	private static TheBirthDateEnteredIsGreaterThanTheHumanLifeExpectancy (age:string):boolean {
		const years = this.calculateAge(age)
		return years > this.maximumAgeReachedByAhuman
	}

	private static calculateAge(age:string): number {
		const dateOfBirth = new Date(age)
		const currentDate = new Date()
		const dateInMilliseconds = this.DifferenceOfDatesInMilliseconds(dateOfBirth , currentDate)
		return this.ConvertMillisecondsToYears(dateInMilliseconds)
	}

	private static DifferenceOfDatesInMilliseconds (startDate:Date, endDate:Date): number {
		return endDate.getTime() - startDate.getTime()
	}

	private static ConvertMillisecondsToYears (milliseconds:number): number {
		const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
		return Math.floor(milliseconds / millisecondsPerYear)
	}
    
}