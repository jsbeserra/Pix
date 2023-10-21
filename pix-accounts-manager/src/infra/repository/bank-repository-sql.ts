import IDatabaseConnection from '@application/interfaces/data/connection/Idatabase-connection'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import Bank from '@domain/entities/bank'

export default class BankRepository implements IBankRepository {

	constructor(private database:IDatabaseConnection){
        
	}
	async findByName(name: string): Promise<Bank | undefined> {
		const [bank] = await this.database.query(`SELECT * FROM bank WHERE name = '${name}'`)
		if (!bank) return
		return Bank.restore(bank.id,bank.name,bank.url_for_transaction,bank.webhook_notification)
	}
	async create(bank: Bank): Promise<void> {
		await this.database.save('insert into bank (name, url_for_transaction, webhook_notification) VALUES (?, ?, ?)'
			,[bank.name,bank.urlForTransactions.value,bank.webhookNotification.value])
	}

	async findById(id: string): Promise<Bank | undefined> {
		const [bank] = await this.database.query(`SELECT * FROM bank WHERE id = '${id}'`)
		if (!bank) return
		return Bank.restore(bank.id,bank.name,bank.url_for_transaction,bank.webhook_notification)
	}

}