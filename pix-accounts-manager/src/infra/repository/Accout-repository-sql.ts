import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import { TypeOrmHelper } from '@main/data-base/typeorm/tyepeorm.helper'


export default class AccountRepository implements IAccountRepository {

	constructor(){
	}

	async existsPixKey(pixKey: PixKey): Promise<boolean> {
		const exist = await TypeOrmHelper.getAccountEntity().findOneBy({pix_key:pixKey.value})
		console.log('0---------------------------------------------------------')
		console.log(exist)
		if (!exist) return false
		return true
	}
    
	async create(account: Account): Promise<void> {
		const bankId = parseInt(account.bank.id!)
		const _account = TypeOrmHelper.getAccountEntity().create({
			cpf:account.cpf.value,
			pix_key: account.pixKey.value,
			bank_id: bankId
		})
		await TypeOrmHelper.getAccountEntity().save(_account)
	}
    
	async existsCpf(cpf: Cpf): Promise<boolean> {
		const exist = await TypeOrmHelper.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!exist) return false
		return true
	}
    
}