
export type InputCreatePixKey = {
    cpf:string
    bank_id:string
    pix_key:string
}
export interface IGatewayPix {
    createPixKey(input:InputCreatePixKey):Promise<any>
    deletePixKey(pix_key:string):Promise<any>
    transaction(payerPixKey:string, receiverPixKey:string, value:number):Promise<{code:string,status:string}>
}