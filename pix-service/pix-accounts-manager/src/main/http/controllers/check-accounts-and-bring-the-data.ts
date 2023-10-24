
import { usecase } from '@application/command/usecase'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { ok } from '../util'
import handleError from '@main/errors/handleError'

export class CheckAccountsAndBringTheDataAccountController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'payer_pix_key','receiver_pix_key' ]
	private usecase: usecase
	
	constructor(usecase: usecase) {
		this.usecase = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.usecase.handle(request.params)
			return ok(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}