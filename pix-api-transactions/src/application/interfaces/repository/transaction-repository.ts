import Transaction from '@domain/transaction'

export interface ITransactionRepository {
    save(transaction:Transaction):Promise<void>
    get(code:string):Promise<Transaction | undefined>
    updateStatus(code:string,status:string):Promise<void>
}