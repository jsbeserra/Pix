import PixKey from '@domain/value-objects/pix-key'

export default interface IPixKeyRepository {
    save(pixKey: string, accountId:string): Promise<void>
    get(cpf:string): Promise<PixKey | undefined>
    remove(cpf:string): Promise<void>
}
