import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'
import { TransactionFailed } from '@infra/errors/repository/create-account'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'


export default class AccountRepositoryTypeOrm implements IAccountRepository {

	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}

	async existsPixKey(pixKey: PixKey): Promise<boolean> {
		const exist = await this.typeormAdpter.getAccountEntity().findOneBy({pix_key:pixKey.value})
		if (!exist) return false
		return true
	}
    
	async create(account: Account): Promise<void> {
		const _account = this.typeormAdpter.getAccountEntity().create({
			cpf:account.cpf.value,
			pix_key: account.pixKey.value,
			bank_id: account.bank.id
		})
		await this.typeormAdpter.getAccountEntity().save(_account)
		
	}
    
	async existsCpf(cpf: Cpf): Promise<boolean> {
		const exist = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf.value})
		if (!exist) return false
		return true
	}

	async delete(pix_key:PixKey): Promise<void> {
		try {
			await this.typeormAdpter.manager().transaction(async transactionalEntityManager => {
				const accountData = await this.typeormAdpter.getAccountEntity().findOneBy({pix_key:pix_key.value})
				const bankData = await this.typeormAdpter.getBankEntity().findOneBy({id:accountData!.bank_id})
				const accountHistory = this.typeormAdpter.getHistoryAccountEntity().create({
					cpf:accountData!.cpf,
					bank_name:bankData!.name,
					bank_url_for_transaction:bankData!.url_for_transaction,
					bank_webhook_notification:bankData!.webhook_notification,
					pix_key:accountData?.pix_key,
					created_at:accountData!.created_at
				})
				await transactionalEntityManager.save(accountHistory)
				await transactionalEntityManager.remove(accountData!)
			})
		} catch (err){
			console.log(err.message)
			throw new TransactionFailed()
		}
	}
    
}