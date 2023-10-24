import { AccountDataDto } from './AccountDataDto'

export type payloadTransactionQueue = {
    payer:AccountDataDto
    receiver:AccountDataDto,
    value:number,
    code:string
}