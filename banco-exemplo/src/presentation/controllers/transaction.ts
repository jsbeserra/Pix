import { ApplicationHandle } from '@application/applicationHandle'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class TransactionController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'payer_cpf', 'receiver_pixkey', 'value']
	private command: ApplicationHandle

	constructor(command: ApplicationHandle) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			console.log(request.body)
			const result = await this.command.handle(request.body)
			return created(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}