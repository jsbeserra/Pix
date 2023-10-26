import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import Bank from './bank'

export default class Account {

	private constructor(readonly pixKey: PixKey[], readonly cpf: Cpf, readonly bank: Bank, readonly id?:string ) {}

	public static create(pixKey: PixKey[], cpf: Cpf, bank: Bank): Account {
		return new Account(pixKey,cpf,bank)
	}

	public static restore(pixKey: string[], cpf: string, bank: Bank, id:string) {
		const pixkeys: PixKey[] = []
		for (const pixkey in pixKey){
			pixkeys.push(PixKey.restore(pixkey))
		}
		const _cpf = Cpf.restore(cpf)
		return new Account(pixkeys,_cpf,bank,id)
	}

	public addPixKey(pixKey:PixKey):Account{
		const pixkeys: PixKey[] = []
		pixkeys.push(pixKey)
		return new Account(pixkeys,this.cpf,this.bank)
	}

}
