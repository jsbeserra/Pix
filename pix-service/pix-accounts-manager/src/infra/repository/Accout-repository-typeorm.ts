import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import Bank from '@domain/entities/bank'
import { TransactionFailed } from '@infra/errors/repository/create-account'
import ITypeOrmAdpter from '@main/data-base/typeorm/itypeorm-adpter'

export default class AccountRepositoryTypeOrm implements IAccountRepository {

	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}

	async getAccount(cpf: string): Promise<Account | undefined> {
		const account = await this.typeormAdpter.getAccountEntity()
			.createQueryBuilder('account') 
			.innerJoinAndSelect('account.pixKeys', 'pixKeys')
			.innerJoinAndSelect('account.bank', 'bank')
			.where('account.cpf = :cpf', { cpf: cpf })
			.getOne()

		if (!account) return
		const pixkeys:string[] = account.pixKeys?.map(key => key.pix_key)
		const bank = Bank.restore(account.bank.id,account.bank.name,account.bank.url_for_transaction,account.bank.url_for_refund)
		return Account.restore(pixkeys,account.cpf,bank,account.id)
	}
    
	async create(account: Account): Promise<void> {
		await this.typeormAdpter.manager().transaction(async transactionalEntityManager => {
			const _account = this.typeormAdpter.getAccountEntity().create({cpf:account.cpf.value,bank_id: account.bank.id})
			await transactionalEntityManager.getAccountEntity().save(_account)
			const pixKey = this.typeormAdpter.getPixKeyEntity().create({account_id:_account.id,pix_key:account.pixKey[0].value})
			await transactionalEntityManager.getPixKeyEntity().save(pixKey)
		})
	}

	async delete(pix_key:string): Promise<void> {
		try {
			await this.typeormAdpter.manager().transaction(async transactionalEntityManager => {
				const pixKey = await this.typeormAdpter.getPixKeyEntity().findOneBy({pix_key:pix_key})
				const accountData = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:pixKey?.account.cpf})
				const bankData = await this.typeormAdpter.getBankEntity().findOneBy({id:accountData!.bank_id})
				const accountHistory = this.typeormAdpter.getHistoryAccountEntity().create({
					cpf:accountData!.cpf,
					bank_name:bankData!.name,
					bank_url_for_transaction:bankData!.url_for_transaction,
					bank_url_for_refund:bankData!.url_for_refund,
					pix_key:pixKey?.pix_key,
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