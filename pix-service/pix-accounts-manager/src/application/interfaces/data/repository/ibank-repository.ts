import Bank from '@domain/entities/bank'

export interface IBankRepository {
    findById(id:string):Promise<Bank | undefined>
    findByName(name:string): Promise<Bank | undefined>
    create(bank:Bank):Promise<{id:string}>
}