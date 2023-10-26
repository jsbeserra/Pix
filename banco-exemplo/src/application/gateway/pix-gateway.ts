
export type InputCreatePixKey = {
    cpf:string
    bank_id:string
    pix_key:string
}

type GetPixKeyOutput = {
    cpf: string
    pix_key: string
}

export interface IGatewayPix {
    getPixKey(cpf:string):Promise<GetPixKeyOutput | undefined>
    createPixKey(input:InputCreatePixKey):Promise<void>
    deletePixKey(pix_key:string):Promise<void>
    transaction(payerPixKey:string, receiverPixKey:string, value:number):Promise<{code:string,status:string}>
}