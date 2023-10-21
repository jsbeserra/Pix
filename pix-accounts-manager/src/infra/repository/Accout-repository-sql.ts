import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import IDatabaseConnection from '@application/interfaces/data/connection/Idatabase-connection'
import PixKey from '@domain/value-objects/pix-key'

export default class AccountRepository implements IAccountRepository {

	constructor(private database:IDatabaseConnection){
	}

	async existsPixKey(pixKey: PixKey): Promise<boolean> {
		const exist = await this.database.query(`SELECT pix_key FROM account WHERE pix_key = '${pixKey.value}'`)
		if (exist === undefined) return false
		return exist.length > 0 ? true : false
	}
    
	async create(account: Account): Promise<void> {
		await this.database.save('INSERT INTO account (cpf, bank_id, pix_key) VALUES (?, ?, ?)',[account.cpf.value, account.bank.id, account.pixKey.value])
	}
    
	async existsCpf(cpf: Cpf): Promise<boolean> {
		const exist = await this.database.query(`SELECT cpf FROM account WHERE cpf = '${cpf.value}'`)
		if (exist === undefined) return false
		return exist.length > 0 ? true : false
	}
    
}