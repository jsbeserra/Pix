import { InvalidDomain, InvalidProtocol } from '@domain/errors/value-objects/urlFotTranscations'

export default class Url {
	private constructor(readonly value:string){}

	static create(value:string){
		Url.validate(value)
		return new Url(value)
	}

	static restore(value:string){
		return new Url(value)
	}

	private static validate(value:string):boolean {
		if (!this.isValidProtocol(value)) throw new InvalidProtocol()
		if (!this.isValidDomain(value)) throw new InvalidDomain()
		return true
	}

	private static isValidProtocol(value:string):boolean{
		const regexp = new RegExp(/^(http:\/\/|https:\/\/)/)
		return regexp.test(value)
	}

	private static isValidDomain(value:string): boolean {
		const regexp = new RegExp(/^(https?:\/\/)?(?:(?:[a-zA-Z0-9-]+)\.)+[a-zA-Z]{2,}(\/[^\s]*)?|^([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)$/)
		return regexp.test(value)
	}
}