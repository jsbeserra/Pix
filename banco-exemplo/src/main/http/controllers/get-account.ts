import { ApplicationHandle } from '@application/applicationHandle'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { ok } from '../util'
import handleError from '@main/errors/handleError'

export class GetAccountController implements ControllerOperation {
	readonly requiredParams: string[] = ['cpf']
	private command: ApplicationHandle

	constructor(command: ApplicationHandle) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.command.handle(request.params.cpf)
			return ok(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}