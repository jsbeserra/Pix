import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import Bank from '@domain/entities/bank'
import PixKey from '@domain/value-objects/pix-key'
import { TransactionFailed } from '@infra/errors/repository/create-account'
import ITypeOrmAdpter from '@main/data-base/typeorm/itypeorm-adpter'

export default class AccountRepositoryTypeOrm implements IAccountRepository {

	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}
	async createPixKey(account_id: string, pix_key: string): Promise<void> {
		const pixKey = this.typeormAdpter.getPixKeyEntity().create({pix_key:pix_key,account_id:account_id})
		await this.typeormAdpter.getPixKeyEntity().save(pixKey)
	}

	async getAllPixKeysByCpf(cpf: string): Promise<PixKey[] | undefined> {
		const account = await this.typeormAdpter.getAccountEntity()
			.createQueryBuilder('account') 
			.innerJoinAndSelect('account.pixKeys', 'pixKeys')
			.innerJoinAndSelect('account.bank', 'bank')
			.where('account.cpf = :cpf', { cpf: cpf })
			.getOne()
		if (!account) return
		return account.pixKeys?.map(key => PixKey.restore(key.pix_key))
	}


	async getAccountByCpf(cpf: string): Promise<Account | undefined> {
		const account = await this.typeormAdpter.getAccountEntity()
			.createQueryBuilder('account') 
			.innerJoinAndSelect('account.pixKeys', 'pixKeys')
			.innerJoinAndSelect('account.bank', 'bank')
			.where('account.cpf = :cpf', { cpf: cpf })
			.getOne()
		console.log(account+'aaa')
		if (!account) return
		const pixkeys:string[] = account.pixKeys?.map(key => key.pix_key)
		const bank = Bank.restore(account.bank.id,account.bank.name,account.bank.url_for_transaction,account.bank.url_for_refund)
		return Account.restore(pixkeys,account.cpf,bank,account.id)
	}

	async getAccountByPixKey(pixKey: string): Promise<Account | undefined> {
		const account = await this.typeormAdpter.getAccountEntity()
			.createQueryBuilder('account') 
			.innerJoinAndSelect('account.pixKeys', 'pixKeys')
			.innerJoinAndSelect('account.bank', 'bank')
			.where('pixKeys.pix_key = :pixKey', { pixKey: pixKey })
			.getOne()
		if (!account) return
		const pixkeys:string[] = account.pixKeys?.map(key => key.pix_key)
		const bank = Bank.restore(account.bank.id,account.bank.name,account.bank.url_for_transaction,account.bank.url_for_refund)
		return Account.restore(pixkeys,account.cpf,bank,account.id)
	}
    
	async createAccount(account: Account): Promise<void> {
		await this.typeormAdpter.manager().transaction(async transactionalEntityManager => {
			const _account = this.typeormAdpter.getAccountEntity().create({cpf:account.cpf.value,bank_id: account.bank.id})
			await transactionalEntityManager.save(_account)
			const pixKey = this.typeormAdpter.getPixKeyEntity().create({account_id:_account.id,pix_key:account.pixKey[0].value})
			await transactionalEntityManager.save(pixKey)
		})
	}

	async deletePixKey(pix_key:string): Promise<void> {
		try {
			await this.typeormAdpter.manager().transaction(async transactionalEntityManager => {
				const pixKey = await this.typeormAdpter.getPixKeyEntity().findOneBy({pix_key:pix_key})
				const accountData = await this.typeormAdpter.getAccountEntity().findOneBy({id:pixKey?.account_id})
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
				await transactionalEntityManager.remove(pixKey!)
			})
		} catch (err){
			console.log(err.message)
			throw new TransactionFailed()
		}
	}

	async deleteAccount(cpf: string): Promise<void> {
		const accountData = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf})
		if (!accountData) throw new Error('account not found')
		await this.typeormAdpter.getAccountEntity().remove(accountData)
	}
    
}