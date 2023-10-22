export type OutPutcheckAccountsAndBringTheData = {
    payer:accountData
    receiver:accountData
}

type accountData = {
    cpf:string
    pix_key:string
    url_for_transaction:string
    webhook_notification:string
}