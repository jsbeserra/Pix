import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import Bank from '@domain/entities/bank'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'

export default class BankRepositoryTypeOrm implements IBankRepository {

	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}

	async findByName(name: string): Promise<Bank | undefined> {
		const bank = await this.typeormAdpter.getBankEntity().findOneBy({name:name})
		if (!bank) return
		return Bank.restore(bank.id.toString(),bank.name,bank.url_for_transaction,bank.webhook_notification)
	}

	async create(bank: Bank): Promise<{id:string}> {
		const bankForSave =this.typeormAdpter.getBankEntity().create({
			name:bank.name,
			url_for_transaction:bank.urlForTransactions.value,
			webhook_notification:bank.webhookNotification.value
		})
		await this.typeormAdpter.getBankEntity().save(bankForSave)
		return {
			id:bankForSave.id
		}
	}

	async findById(id: string): Promise<Bank | undefined> {
		const bank = await this.typeormAdpter.getBankEntity().findOneBy({id:id})
		if (!bank) return
		return Bank.restore(bank.id.toString(),bank.name,bank.url_for_transaction,bank.webhook_notification)
	}

}