import { AccountDataDto } from '@application/dto/AccountDataDto'

export type InputGateway = {
    payer_pix_key:string,
    receiver_pix_key:string
}

export type OutPutGateway = {
    payer:AccountDataDto
    receiver:AccountDataDto
}

export interface IGatewayAccount {
    exec(input:InputGateway):Promise<OutPutGateway>
}