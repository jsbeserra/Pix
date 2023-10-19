import { NameAllowedCharacters, NameContainsNumbers } from '../errors/value-objects'

export default class FullName {

	private constructor(readonly value) {}

	public static create(value:string): FullName {
		FullName.validate(value)
		return new FullName(value)
	}

	public static restore(fullName:string): FullName {
		return new FullName(fullName)
	}

	private static validate(fullName:string) {
		if (this.hasNumbers(fullName)) throw new NameContainsNumbers('FullName')
		if (!this.ThereAreOnlyAllowedCharacters(fullName)) throw new NameAllowedCharacters('FullName')
	}

	private static hasNumbers(fullName:string):boolean {
		const regexp = new RegExp(/\d/g)
		return regexp.test(fullName)
	}

	private static ThereAreOnlyAllowedCharacters(fullName:string):boolean {
		const regexp = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
		return regexp.test(fullName)
	}
    
}