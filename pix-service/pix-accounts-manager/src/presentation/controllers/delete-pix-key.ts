
import { usecase } from '@application/command/usecase'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class DeletePixKeyController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'pix_key' ]
	private usecase: usecase
	
	constructor(usecase: usecase) {
		this.usecase = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.usecase.handle(request.params.pix_key)
			return created(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}