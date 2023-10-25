import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'

export default interface IAccountRepository {
    create(account:Account): Promise<void>
    exists(cpf:string): Promise<boolean>
    savePixKey(pixKey: PixKey,cpf:Cpf): Promise<void>
    removePixKey(cpf:Cpf): Promise<void>
    deposit(cpf:Cpf, debit:number):Promise<void>
    updateBalance(cpf:Cpf, value:number):Promise<void>
    balance(cpf:Cpf):Promise<number>
    getAccount(cpf:string):Promise<Account | undefined>
}
