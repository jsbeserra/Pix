import { CommandHandler } from '@application/Handle'
import { InputTransaction } from '@application/command/transaction/input-transaction'
import { OutPutTransaction } from '@application/command/transaction/out-put-transaction'
import errorMapper from '@main/errors/error-mapper'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class TransactionController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'payer_cpf', 'receiver_pixkey', 'value']
	private command: CommandHandler<InputTransaction,OutPutTransaction>

	constructor(command: CommandHandler<InputTransaction,OutPutTransaction>) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.command.handle(request.body)
			return created(result)
		} catch (err: any) {
			return errorMapper(err)
		}
	}

}