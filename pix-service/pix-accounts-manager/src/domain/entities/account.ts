import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import Bank from './bank'

export default class Account {

	private constructor(readonly pixKey: PixKey, readonly cpf: Cpf, readonly bank: Bank) {}

	public static create(pixKey: PixKey, cpf: Cpf, bank: Bank): Account {
		return new Account(pixKey,cpf,bank)
	}

	public static restore(pixKey: string, cpf: string, bank: Bank) {
		const pix_key = PixKey.restore(pixKey)
		const _cpf = Cpf.restore(cpf)
		return new Account(pix_key,_cpf,bank)
	}

}
