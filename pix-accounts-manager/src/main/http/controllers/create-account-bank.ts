
import { usecase } from '@application/command/usecase'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { created } from '../util'
import handleError from '@main/errors/handleError'

export class CreateAccountBankController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'name', 'url_for_transaction', 'webhook_notification']
	private usecase: usecase
	
	constructor(usecase: usecase) {
		this.usecase = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.usecase.handle(request.body)
			return created(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}