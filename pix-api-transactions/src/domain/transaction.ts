
export type TransactionStatus = 'pending'|'success'|'falha'

export default class Transaction {
	private constructor(
        readonly code:string,
        readonly receiver_pix_key:string,
        readonly payer_pix_key:string,
        readonly value:number,
        readonly status:string
	){}

	public static create(code:string,receiver_pix_key:string,payer_pix_key:string,value:number,status:TransactionStatus): Transaction {
		return new Transaction(code,receiver_pix_key,payer_pix_key,value,status)
	}

	public static restore(code:string,receiver_pix_key:string,payer_pix_key:string,value:number,status:string): Transaction {
		return new Transaction(code,receiver_pix_key,payer_pix_key,value,status)
	}
}