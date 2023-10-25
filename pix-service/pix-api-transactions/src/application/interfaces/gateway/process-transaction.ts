
export type processTransactionPayload = {
    payer_cpf: string,
    receiver_cpf: string,
    value: number
}
export type refaundTransactionPayload = {
    cpf: string,
    code: string,
    value: number
}
export interface IProcessTransactionGateway {
    exec(url:string, body:processTransactionPayload):Promise<void | Error>
    refaund(url:string, body:refaundTransactionPayload):Promise<void | Error>
}
