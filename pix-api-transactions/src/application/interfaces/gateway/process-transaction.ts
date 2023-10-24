
export type ProcessTransactionPayload = {
    payer_cpf: string,
    receiver_cpf: string,
    value: number
}
export interface IProcessTransactionGateway {
    exec(url:string, body:ProcessTransactionPayload):Promise<void | Error>
}
