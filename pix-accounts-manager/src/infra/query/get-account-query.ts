import { AccountDto, IAccountQuery } from '@application/interfaces/data/query/account-query'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'

export default class AccountQuery implements IAccountQuery{
	constructor(readonly typeormAdpter:ITypeOrmAdpter){
	}

	async getAccountByPixKey(pix_key: string): Promise<AccountDto | undefined> {
		console.log(pix_key)
		const account = await this.typeormAdpter.getAccountEntity()
			.createQueryBuilder('account')
			.innerJoinAndSelect('account.bank', 'bank')
			.where('account.pix_key = :pixKey', { pixKey: pix_key })
			.getOne()
		if (!account) return
		const output:AccountDto = {
			cpf:account.cpf,
			pix_key:account.pix_key,
			url_for_transaction:account.bank.url_for_transaction,
			webhook_notification:account.bank.webhook_notification
		}
		return output
	}

}