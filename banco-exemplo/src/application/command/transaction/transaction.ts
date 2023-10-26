import { InputTransaction } from './input-transaction'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Cpf from '@domain/value-objects/cpf'
import { AccountNotFound } from '@application/errors/shared-errors'
import { FailedTransaction, InsufficientFunds, TransactionMinimumValue } from '@application/errors/command/transaction-error'
import { OutPutTransaction } from './out-put-transaction'
import Account from '@domain/entities/account'
import { CommandHandler } from '@application/Handle'

export default class Transaction implements CommandHandler<InputTransaction,OutPutTransaction> {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix){}

	async handle(input: InputTransaction): Promise<OutPutTransaction> {
		if (this.hasMinimumValue(input.value)) throw new TransactionMinimumValue()
		const cpf = Cpf.create(input.payer_cpf)
		const account = await this.repository.getAccount(cpf.value)
		if (!account) throw new AccountNotFound()
		this.validateAccountPayer(account,input.value)
		const payer_pix_key = await this.gatewayPix.getPixKey(cpf.value)
		if (payer_pix_key.length <= 0) throw new Error('falta pix na conta')
		const transactionStatus = await this.createPixTransaction(payer_pix_key[0],input.receiver_pixkey,input.value)
		account.debit(input.value)
		await this.repository.updateBalance(account.cpf,account.balance)
		return {code:transactionStatus.code, status:transactionStatus.status}
	} 
	
	private validateAccountPayer(account:Account,transactionValue:number): void {
		if (!account) throw new AccountNotFound()
		if (this.hasSufficientBalance(account,transactionValue)) throw new InsufficientFunds()
	}
	
	private hasSufficientBalance(account:Account,transactionValue:number):boolean {
		return account.balance < transactionValue
	}
	
	private hasMinimumValue(transactionValue:number):boolean {
		return transactionValue <= 0
	}

	private async createPixTransaction(payer_pixKey:string,receiverPixKey:string, transactionValue:number): Promise<{status:string,code:string}> {
		const result = await this.gatewayPix.transaction(payer_pixKey,receiverPixKey,transactionValue)
		if (result instanceof Error) throw new FailedTransaction()
		return result
	}

}