import { CommandHandler } from '@application/Handle'
import { InputRefundTransactionPix } from '@application/command/ refund-transaction-pix/input-transaction'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class RefundTransactionPixController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'cpf', 'value', 'code']
	private command: CommandHandler<InputRefundTransactionPix,void>  

	constructor(command: CommandHandler<InputRefundTransactionPix,void> ) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			await this.command.handle(request.body)
			return created()
		} catch (err: any) {
			return handleError(err)
		}
	}

}