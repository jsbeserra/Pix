
export interface AccountDto {
    cpf?:string
    pix_key:string
    url_for_transaction?:string
    webhook_notification?:string
}
export interface IAccountQuery {
    getAccountByPixKey(pix_key:string):Promise<AccountDto | undefined>
    getAccountByPixCpf(pix_key:string):Promise<{pix_key:string} | undefined>
}