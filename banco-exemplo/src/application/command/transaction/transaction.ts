import { ApplicationHandle } from '@application/applicationHandle'
import { InputTransaction } from './input-transaction'
import { IGatewayPix } from '@application/gateway/pix-gateway'
import IAccountRepository from '@application/interfaces/data/repository/iaccount-repository'
import Cpf from '@domain/value-objects/cpf'
import { AccountNotFound } from '@application/errors/shared-errors'
import { IAccountQuery } from '@application/interfaces/data/query/account-query'
import { AccountDoesNotContainPixKey, FailedTransaction, InsufficientFunds, TransactionMinimumValue } from '@application/errors/command/transaction-error'
import PixKey from '@domain/value-objects/pix-key'
import { OutPutTransaction } from './out-put-transaction'

export default class Transaction implements ApplicationHandle {

	constructor(private repository:IAccountRepository, private gatewayPix:IGatewayPix, private accountQuery:IAccountQuery){}

	async handle(input: InputTransaction): Promise<OutPutTransaction> {
		const payerCpf = Cpf.create(input.payer_cpf)
		const receiverPixKey = PixKey.create(input.receiver_pixkey)
		if (input.value <= 0) throw new TransactionMinimumValue()
		const account = await this.accountQuery.getAccountByCpf(payerCpf.value)
		if (!account) throw new AccountNotFound()
		if (!account.pix_key) throw new AccountDoesNotContainPixKey()
		if (account.balance < input.value) throw new InsufficientFunds()
		const payerPixKey = PixKey.create(account.pix_key)
		const result = await this.gatewayPix.transaction(payerPixKey,receiverPixKey,input.value)
		if (result instanceof Error){
			throw new FailedTransaction()
		}
		const balance = account.balance - input.value
		await this.repository.debit(payerCpf,balance)
		return {code:result.code, status:result.status}
	}       
}