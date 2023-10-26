import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import Bank from '@domain/entities/bank'
import ITypeOrmAdpter from '@main/data-base/typeorm/itypeorm-adpter'

export default class BankRepositoryTypeOrm implements IBankRepository {

	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}

	async findByName(name: string): Promise<Bank | undefined> {
		const bank = await this.typeormAdpter.getBankEntity().findOneBy({name:name})
		if (!bank) return
		return Bank.restore(bank.id.toString(),bank.name,bank.url_for_transaction,bank.url_for_refund)
	}

	async create(bank: Bank): Promise<{id:string}> {
		const bankForSave =this.typeormAdpter.getBankEntity().create({
			name:bank.name,
			url_for_transaction:bank.urlForTransactions.value,
			url_for_refund:bank.url_for_refund.value
		})
		await this.typeormAdpter.getBankEntity().save(bankForSave)
		return {
			id:bankForSave.id
		}
	}

	async findById(id: string): Promise<Bank | undefined> {
		const bank = await this.typeormAdpter.getBankEntity().findOneBy({id:id})
		if (!bank) return
		return Bank.restore(bank.id.toString(),bank.name,bank.url_for_transaction,bank.url_for_refund)
	}

}