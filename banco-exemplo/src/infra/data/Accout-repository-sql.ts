import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'

export default class AccountRepositoryPostgresql implements IAccountRepository {

	constructor(private typeormAdpter:ITypeOrmAdpter){
	}
   
	async create(account: Account): Promise<void> {
		const _account = this.typeormAdpter.getAccountEntity().create({
			cpf:account.cpf.value,
			balance:account.balance,
			date_of_birth:account.dateOfBirth.value,
			name:account.name.value,
			mother_name:account.motherName.value
		})
		await this.typeormAdpter.getAccountEntity().save(_account)
	}
    
	async exists(cpf: Cpf): Promise<boolean> {
		const exist = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!exist) return false
		return true
	}
    
	async savePixKey(pixKey: PixKey, cpf: Cpf): Promise<void> {
		const account = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!account) throw new Error('Account not found')
		account.pix_key = pixKey.value
		await this.typeormAdpter.getAccountEntity().save(account)
	}

	async removePixKey(cpf: Cpf): Promise<void> {
		const account = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!account) throw new Error('Account not found')
		account.pix_key = null
		await this.typeormAdpter.getAccountEntity().save(account)
	}

	async deposit(cpf: Cpf, deposit: number): Promise<void> {
		const account = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!account) throw new Error('Account not found')
		account.balance = deposit
		await this.typeormAdpter.getAccountEntity().save(account)
	}

	async balance(cpf: Cpf): Promise<number> {
		const account = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!account) throw new Error('Account not found')
		return account.balance
	}

	async debit(cpf: Cpf, value: number): Promise<void> {
		const account = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!account) throw new Error('Account not found')
		account.balance = value
		await this.typeormAdpter.getAccountEntity().save(account)
	}
	
}