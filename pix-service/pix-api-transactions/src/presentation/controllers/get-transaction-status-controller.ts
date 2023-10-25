
import { ApplicationHandle } from '@application/application-handle'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@infra/http/ports'
import { ok } from '@infra/http/util'


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