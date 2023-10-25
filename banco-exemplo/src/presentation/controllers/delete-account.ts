import { ApplicationHandle } from '@application/applicationHandle'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { ok } from '@main/http/util'

export class DeleteAccountController implements ControllerOperation {
	readonly requiredParams: string[] = ['cpf','dateOfBirth']
	private command: ApplicationHandle

	constructor(command: ApplicationHandle) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.command.handle(request.params)
			return ok(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}