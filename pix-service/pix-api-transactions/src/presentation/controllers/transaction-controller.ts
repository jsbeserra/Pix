
import { ApplicationHandle } from '@application/application-handle'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@infra/http/ports'
import { created } from '@infra/http/util'

export class TransactionController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'payer_pix_key', 'receiver_pix_key', 'value']
	private applicationHandle: ApplicationHandle

	constructor(usecase: ApplicationHandle) {
		this.applicationHandle = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.applicationHandle.handle(request.body)
			return created(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}