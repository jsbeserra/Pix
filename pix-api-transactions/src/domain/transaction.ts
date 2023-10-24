
export type TransactionStatus = 'pending'|'success'|'falha'

export default class Transaction {
	public constructor(
        readonly code:string,
        readonly receiver_pix_key:string,
        readonly payer_pix_key:string,
        readonly value:number,
        readonly status:'pending'|'success'|'falha'
	){}

	// public static restore(code:string,receiver_pix_key:string,payer_pix_key:string,value:number,status:string): Transaction {
	// 	const _status:TransactionStatus = status
	// 	return new Transaction(code,receiver_pix_key,payer_pix_key,value,_status)
	// }
}