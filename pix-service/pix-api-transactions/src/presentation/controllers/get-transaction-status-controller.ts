import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@infra/http/ports'
import { ok } from '@infra/http/util'
import { OutputTransaction } from '@application/use-case/get-transaction-status/output-transaction'
import { usecase } from '@application/usecase'


export class GetTransactionController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'code']
	private applicationHandle: usecase<string,OutputTransaction>

	constructor(usecase: usecase<string,OutputTransaction>) {
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