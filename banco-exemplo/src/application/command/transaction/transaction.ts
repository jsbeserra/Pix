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
		this.validateInput(input)
		const account = await this.repository.getAccount(input.payer_cpf)
		if (!account) throw new AccountNotFound()
		this.validateAccountPayer(account,input.value)
		const payer_pix_key = await this.gatewayPix.getPixKey(input.payer_cpf)
		if (!payer_pix_key) throw new AccountNotFound()
		const transactionStatus = await this.sendTransaction(payer_pix_key.pix_key,input.receiver_pixkey,input.value)
		account.debit(input.value)
		await this.repository.updateBalance(account.cpf,account.balance)
		return {code:transactionStatus.code, status:transactionStatus.status}
	} 

	private validateInput(input: InputTransaction){
		Cpf.isValid(input.payer_cpf)
		if (this.hasMinimumValue(input.value)) throw new TransactionMinimumValue()
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

	private async sendTransaction(payer_pixKey:string,receiverPixKey:string, transactionValue:number): Promise<{status:string,code:string}> {
		const result = await this.gatewayPix.transaction(payer_pixKey,receiverPixKey,transactionValue)
		if (result instanceof Error) throw new FailedTransaction()
		return result
	}

}