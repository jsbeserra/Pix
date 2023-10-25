import { ApplicationHandle } from '@application/applicationHandle'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { created } from '../util'
import handleError from '@main/errors/handleError'

export class TransactionController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'payer_cpf', 'receiver_pixkey', 'value']
	private command: ApplicationHandle

	constructor(command: ApplicationHandle) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.command.handle(request.body)
			return created(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}