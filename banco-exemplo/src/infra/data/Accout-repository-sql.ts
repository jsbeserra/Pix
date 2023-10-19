import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import IDatabaseConnection from '@application/interfaces/data/connection/Idatabase-connection'

export default class AccountRepositoryPostgresql implements IAccountRepository {

	constructor(private postgresqlAdpter:IDatabaseConnection){
	}
    
	async create(account: Account): Promise<void> {
		await this.postgresqlAdpter.save(`INSERT INTO accounts (cpf, name, mother_name, active, opening_date, balance, date_of_birth)
        VALUES ('${account.cpf.value}', '${account.name.value}', '${account.motherName.value}', '${account.isActive}', '${account.openingDate.toISOString()}', '${account.balance}', '${account.dateOfBirth.value.toISOString()}')`)
	}
    
	async exists(cpf: Cpf): Promise<boolean> {
		const exist = await this.postgresqlAdpter.query(`SELECT cpf FROM accounts WHERE cpf = '${cpf.value}'`)
		if (exist === undefined) return false
		return exist.length > 0 ? true : false
	}
    
}