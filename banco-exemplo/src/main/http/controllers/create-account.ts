import { usecase } from '@application/usecase'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { created } from '../util'
import handleError from '@main/errors/handleError'

export class CreateAccountController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'name', 'cpf', 'motherName', 'dateOfBirth']
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