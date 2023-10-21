
export interface AccountDto {
    bank_id:string
    cpf:string
    pix_key:string
    url_for_transaction:string
    webhook_notification:string
}
export interface IAccountQuery {
    getAccountByPixKey(pix_key:string):Promise<AccountDto | undefined>
}