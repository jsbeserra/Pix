import Account from '@domain/entities/account'
import PixKey from '@domain/value-objects/pix-key'

export default interface IAccountRepository {
    createAccount(account:Account): Promise<void>
    createPixKey(account_id:string,pix_key:string): Promise<void>
    deleteAccount(cpf:string): Promise<void>
    deletePixKey(pix_key:string): Promise<void>
    getAccountByCpf(cpf:string): Promise<Account | undefined>
    getAccountByPixKey(pixKey: string): Promise<Account | undefined>
    getAllPixKeysByCpf(cpf:string): Promise<PixKey[] | undefined>
}
