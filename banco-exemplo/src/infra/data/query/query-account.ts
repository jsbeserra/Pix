import { AccountDto, IAccountQuery } from '@application/interfaces/data/query/account-query'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'

export default class QueryAccount implements IAccountQuery {

	constructor(private typeormAdpter:ITypeOrmAdpter){
	}

	async getAccountByCpf(cpf: string): Promise<AccountDto | undefined> {
		const account = await this.typeormAdpter.getAccountEntity().findOneBy({cpf:cpf})
		return account
	}
    
}