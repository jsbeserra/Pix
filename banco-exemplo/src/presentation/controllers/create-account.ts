import { ApplicationHandle } from '@application/applicationHandle'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class CreateAccountController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'name', 'cpf', 'motherName', 'dateOfBirth']
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