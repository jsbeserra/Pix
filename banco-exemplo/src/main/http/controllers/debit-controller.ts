import { usecase } from '@application/usecase'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { created } from '../util'
import handleError from '@main/errors/handleError'

export class DebitController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'value', 'payer_cpf', 'receiver_cpf']
	private command: usecase

	constructor(command: usecase) {
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