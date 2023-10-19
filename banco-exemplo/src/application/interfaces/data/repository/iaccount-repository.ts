import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'

export default interface IAccountRepository {
    create(account:Account): Promise<void>
    exists(cpf:Cpf): Promise<boolean>
}
