import Account from '@domain/entities/account'
import Cpf from '@domain/value-objects/cpf'
import PixKey from '@domain/value-objects/pix-key'

export default interface IAccountRepository {
    create(account:Account): Promise<void>
    existsCpf(cpf:Cpf): Promise<boolean>
    existsPixKey(pixKey:PixKey): Promise<boolean>
}
