import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'

export default interface IAccountRepository {
    create(account:Account): Promise<void>
    exists(cpf:string): Promise<boolean>
    deposit(cpf:Cpf, debit:number):Promise<void>
    updateBalance(cpf:Cpf, value:number):Promise<void>
    balance(cpf:Cpf):Promise<number>
    getAccount(cpf:string):Promise<Account | undefined>
    deleteAccount(cpf:string):Promise<void>
}
