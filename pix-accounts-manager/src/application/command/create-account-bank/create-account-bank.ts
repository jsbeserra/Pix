import { usecase } from '../usecase'
import { IBankRepository } from '@application/interfaces/data/repository/ibank-repository'
import { BankAlreadyExists} from '@application/errors/use-case/create-account'
import InputCreateAccountBank from './input-create-account-ban'
import Bank from '@domain/entities/bank'
import Url from '@domain/value-objects/url'


export default class CreateAccountBank implements usecase {

	constructor(private repository:IBankRepository){}

	async handle(input: InputCreateAccountBank): Promise<{id:string}> {
		const bank = await this.repository.findByName(input.name)
		if (bank) throw new BankAlreadyExists()
		const url_for_transaction = Url.create(input.url_for_transaction)
		const webhook_notification = Url.create(input.webhook_notification)
		const account = Bank.create(input.name,url_for_transaction,webhook_notification)
		const id = await this.repository.create(account)
		return id
	}
    
}