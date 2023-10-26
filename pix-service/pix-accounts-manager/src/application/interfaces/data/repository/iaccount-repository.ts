import Account from '@domain/entities/account'

export default interface IAccountRepository {
    create(account:Account): Promise<void>
    delete(pix_key:string): Promise<void>
    getAccount(cpf:string): Promise<Account | undefined>
}
