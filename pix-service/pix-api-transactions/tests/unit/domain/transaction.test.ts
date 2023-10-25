import { ErrorMinimumValue, ErrorNegativeValue } from '@domain/error/transaction-error'
import Transaction, { TransactionStatus } from '@domain/transaction'


describe('Transaction', () => {
	it('should create a valid transaction', () => {
		const code = '123456'
		const receiverPixKey = 'receiver_pix_key'
		const payerPixKey = 'payer_pix_key'
		const value = 200
		const status: TransactionStatus = 'pending'

		const transaction = Transaction.create(code, receiverPixKey, payerPixKey, value, status)

		expect(transaction).toBeInstanceOf(Transaction)
		expect(transaction.code).toBe(code)
		expect(transaction.receiver_pix_key).toBe(receiverPixKey)
		expect(transaction.payer_pix_key).toBe(payerPixKey)
		expect(transaction.value).toBe(value)
		expect(transaction.status).toBe(status)
	})

	it('should throw an error for zero value', () => {
		const code = '123456'
		const receiverPixKey = 'receiver_pix_key'
		const payerPixKey = 'payer_pix_key'
		const value = 0
		const status: TransactionStatus = 'pending'

		expect(() => Transaction.create(code, receiverPixKey, payerPixKey, value, status)).toThrow(ErrorMinimumValue)
	})

	it('should throw an error for negative value', () => {
		const code = '123456'
		const receiverPixKey = 'receiver_pix_key'
		const payerPixKey = 'payer_pix_key'
		const value = -100
		const status: TransactionStatus = 'pending'

		expect(() => Transaction.create(code, receiverPixKey, payerPixKey, value, status)).toThrow(ErrorNegativeValue)
	})

	it('should restore a transaction', () => {
		const code = '123456'
		const receiverPixKey = 'receiver_pix_key'
		const payerPixKey = 'payer_pix_key'
		const value = 200
		const status = 'pending'

		const transaction = Transaction.restore(code, receiverPixKey, payerPixKey, value, status)

		expect(transaction).toBeInstanceOf(Transaction)
		expect(transaction.code).toBe(code)
		expect(transaction.receiver_pix_key).toBe(receiverPixKey)
		expect(transaction.payer_pix_key).toBe(payerPixKey)
		expect(transaction.value).toBe(value)
		expect(transaction.status).toBe(status)
	})
})
