
export interface AccountDto {
    balance:string
    name:string,
    cpf:string,
    mother_name:string
    opening_date:string
    pix_key:string
}
export interface IAccountQuery {
    getAccountByCpf(cpf:string):Promise<AccountDto | undefined>
}