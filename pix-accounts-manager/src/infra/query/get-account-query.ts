import IDatabaseConnection from '@application/interfaces/data/connection/Idatabase-connection'
import { AccountDto, IAccountQuery } from '@application/interfaces/data/query/account-query'

export default class AccountQuery implements IAccountQuery{
	constructor(private database:IDatabaseConnection){
	}

	async getAccountByPixKey(pix_key: string): Promise<AccountDto | undefined> {

		const [account] = await this.database.query(`SELECT account.pix_key, account.cpf, bank.url_for_transaction, 
		bank.webhook_notification from account inner join bank on account.bank_id = bank.id where account.pix_key = '${pix_key}'`)
		if (!account) return
		return account as AccountDto
	}

}