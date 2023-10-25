
import { usecase } from '@application/command/usecase'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { created } from '../util'
import handleError from '@main/errors/handleError'

export class CreatePixKeyController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'bank_id', 'cpf', 'pix_key']
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