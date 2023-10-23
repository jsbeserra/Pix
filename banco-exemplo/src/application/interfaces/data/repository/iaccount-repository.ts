import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'

export default interface IAccountRepository {
    create(account:Account): Promise<void>
    exists(cpf:Cpf): Promise<boolean>
    savePixKey(pixKey: PixKey,cpf:Cpf): Promise<void>
    removePixKey(pixKey: PixKey,cpf:Cpf): Promise<void>
}
