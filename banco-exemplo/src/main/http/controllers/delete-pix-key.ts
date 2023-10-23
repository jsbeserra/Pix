import { usecase } from '@application/usecase'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { ok } from '../util'
import handleError from '@main/errors/handleError'

export class DeletePixKeyController implements ControllerOperation {
	readonly requiredParams: string[] = ['cpf','pix_key']
	private command: usecase

	constructor(command: usecase) {
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