import { InputRefundTransactionPix } from './input-transaction'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Cpf from '@domain/value-objects/cpf'
import { AccountNotFound } from '@application/errors/shared-errors'
import { AccountDoesNotContainPixKey, TransactionMinimumValue } from '@application/errors/command/transaction-error'
import Account from '@domain/entities/account'
import { CommandHandler } from '@application/Handle'

export default class RefundTransactionPix implements CommandHandler<InputRefundTransactionPix,void> {

	constructor(private repository:IAccountRepository){}

	async handle(input: InputRefundTransactionPix): Promise<void> {
		this.validateInput(input)
		const account = await this.repository.getAccount(input.cpf)
		if (!account) throw new AccountNotFound()
		this.validateAccountPayer(account)
		account.deposit(input.value)
		await this.repository.updateBalance(account.cpf,account.balance)
	} 

	private validateInput(input: InputRefundTransactionPix){
		Cpf.isValid(input.cpf)
		if (this.hasMinimumValue(input.value)) throw new TransactionMinimumValue()
	}
	
	private validateAccountPayer(account:Account): void {
		if (!account) throw new AccountNotFound()
		if (!account.pixKey?.value) throw new AccountDoesNotContainPixKey()
	}
	
	private hasMinimumValue(transactionValue:number):boolean {
		return transactionValue <= 0
	}

}