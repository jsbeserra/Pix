import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import Bank from '@domain/entities/bank'
import { TypeOrmHelper } from '@main/data-base/typeorm/tyepeorm.helper'

export default class BankRepository implements IBankRepository {

	constructor(){
        
	}

	async findByName(name: string): Promise<Bank | undefined> {
		const bank = await TypeOrmHelper.getBankEntity().findOneBy({name:name})
		if (!bank) return
		return Bank.restore(bank.id.toString(),bank.name,bank.url_for_transaction,bank.webhook_notification)
	}

	async create(bank: Bank): Promise<void> {
		const bankForSave =TypeOrmHelper.getBankEntity().create({
			name:bank.name,
			url_for_transaction:bank.urlForTransactions.value,
			webhook_notification:bank.webhookNotification.value
		})
		await TypeOrmHelper.getBankEntity().save(bankForSave)
	}

	async findById(id: string): Promise<Bank | undefined> {
		const _id:number = parseInt(id)
		const bank =await TypeOrmHelper.getBankEntity().findOneBy({id:_id})
		//const [bank] = await this.database.query(`SELECT * FROM bank WHERE id = '${id}'`)
		if (!bank) return
		return Bank.restore(bank.id.toString(),bank.name,bank.url_for_transaction,bank.webhook_notification)
	}

}