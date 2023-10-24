import { InvalidCpf } from '../errors/value-objects'

export default class Cpf {

	private constructor(readonly value) {}

	public static create(value:string): Cpf {
		const cpf = this.sanitizer(value)
		if (!Cpf.validate(cpf)) throw new InvalidCpf()
		return new Cpf(cpf)
	}
  
	public static restore(cpf: string): Cpf {
		return new Cpf(cpf)
	}
  
	private static validate(cpf: string) {
		if (this.isValidLength(cpf)) return false
		if (this.allDigitsTheSame(cpf)) return false
		const digit1 = this.calculateDigit(cpf, 10)
		const digit2 = this.calculateDigit(cpf, 11)
		const actualDigit = this.extractCheckDigit(cpf)
		const calculatedDigit = `${digit1}${digit2}`
		return actualDigit == calculatedDigit
	}
  
	private static calculateDigit(cpf: string, factor: number) {
		let total = 0
		for (const digit of cpf) {
			if (factor > 1) total += parseInt(digit) * factor--
		}
		const rest = total % 11
		return rest < 2 ? 0 : 11 - rest
	}
  
	private static sanitizer(cpf: string) {
		return cpf.replace(/\D/g, '')
	}
  
	private static isValidLength(cpf: string) {
		return cpf.length !== 11
	}
  
	private static allDigitsTheSame(cpf: string) {
		return cpf.split('').every((c) => c === cpf[0])
	}
  
	private static extractCheckDigit(cpf: string) {
		return cpf.substring(cpf.length - 2, cpf.length)
	}
}
  