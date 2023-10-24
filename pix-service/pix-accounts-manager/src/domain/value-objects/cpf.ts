import { CpfAllDigitsAreTheSame, CpfInvalidDigit, InvalidCpfLength } from '../errors/value-objects'

export default class Cpf {

	private constructor(readonly value:string) {}

	public static create(value:string): Cpf {
		const cpf = this.sanitizer(value)
		this.validate(cpf)
		return new Cpf(cpf)
	}
  
	public static restore(cpf: string): Cpf {
		return new Cpf(cpf)
	}
  
	private static validate(cpf: string) {
		if (this.isValidLength(cpf)) throw new InvalidCpfLength()
		if (this.allDigitsTheSame(cpf)) throw new CpfAllDigitsAreTheSame()
		const digit1 = this.calculateDigit(cpf, 10)
		const digit2 = this.calculateDigit(cpf, 11)
		const actualDigit = this.extractCheckDigit(cpf)
		const calculatedDigit = `${digit1}${digit2}`
		if (this.isValidDigit(actualDigit,calculatedDigit)) throw new CpfInvalidDigit()
	}
  
	private static calculateDigit(cpf: string, factor: number):number {
		let total = 0
		for (const digit of cpf) {
			if (factor > 1) total += parseInt(digit) * factor--
		}
		const rest = total % 11
		return rest < 2 ? 0 : 11 - rest
	}
  
	private static sanitizer(cpf: string):string {
		return cpf.replace(/\D/g, '')
	}
  
	private static isValidLength(cpf: string): boolean {
		return cpf.length !== 11
	}
  
	private static allDigitsTheSame(cpf: string): boolean {
		return cpf.split('').every((c) => c === cpf[0])
	}
  
	private static extractCheckDigit(cpf: string):string {
		return cpf.substring(cpf.length - 2, cpf.length)
	}

	private static isValidDigit(actualDigit:string,calculatedDigit:string):boolean{
		return actualDigit != calculatedDigit
	}
}
  