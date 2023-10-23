import IDatabaseConnection from '@application/interfaces/data/connection/Idatabase-connection'
import { AccountDto, IAccountQuery } from '@application/interfaces/data/query/account-query'

export default class QueryAccount implements IAccountQuery {

	constructor(private postgresqlAdpter:IDatabaseConnection){
	}

	async getAccountByCpf(pix_key: string): Promise<AccountDto | undefined> {
		const [result] = await this.postgresqlAdpter.query(`select * from accounts where cpf = '${pix_key}'`)
		return result
	}
    
}