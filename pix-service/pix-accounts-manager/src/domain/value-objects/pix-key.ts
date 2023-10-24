import { PixKeyMaximumLength, PixKeyMinimumLength, PixKeyUnacceptedCharacters } from '@domain/errors/value-objects/pix-key-errors'

export default class PixKey {
	
	private static minimumKeyLength = 5
	private static maximumKeyLength = 10

	private constructor(readonly value:string){}

	public static create(value:string): PixKey{
		this.validate(value)
		return new PixKey(value)
	}

	public static restore(value:string): PixKey{
		return new PixKey(value)
	}

	private static validate(value:string){
		if (!this.containLettersAndNumbers(value)) throw new PixKeyUnacceptedCharacters()
		if (this.hasAMinimumSize(value)) throw new PixKeyMinimumLength(this.minimumKeyLength)
		if (this.exceedsMaximumLength(value)) throw new PixKeyMaximumLength(this.maximumKeyLength)
	}

	private static containLettersAndNumbers(key:string):boolean {
		const regexp = new RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]*$/)
		return regexp.test(key)
	}

	private static hasAMinimumSize(key:string): boolean {
		return key.length < this.minimumKeyLength
	}

	private static exceedsMaximumLength(key:string): boolean {
		return key.length > this.maximumKeyLength
	}
}