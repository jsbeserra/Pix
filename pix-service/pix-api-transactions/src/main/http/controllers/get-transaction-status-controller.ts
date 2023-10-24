
import { ApplicationHandle } from '@application/application-handle'
import { ControllerOperation, HttpRequest, HttpResponse } from '../ports'
import { ok } from '../util'
import handleError from '@main/errors/handleError'

export class GetTransactionController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'code']
	private applicationHandle: ApplicationHandle

	constructor(usecase: ApplicationHandle) {
		this.applicationHandle = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.applicationHandle.handle(request.params.code)
			return ok(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}