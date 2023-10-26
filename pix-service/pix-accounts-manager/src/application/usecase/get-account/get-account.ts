import { usecase } from '../usecase'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'

export default class GetPixKey implements usecase<string,string[] | undefined> {

	constructor(private repository:IAccountRepository){}

	async handle(cpf: string): Promise<string[] | undefined> {
		const account = await this.repository.getAccountByCpf(cpf)
		if (!account) return
		const output = account.pixKey.map(pixKey => pixKey.value)
		return output
	}
    
}