
import errorMapper from '@main/errors/error-mapper'
import { ControllerOperation, HttpRequest, HttpResponse } from '@infra/http/ports'
import { created } from '@infra/http/util'
import { usecase } from '@application/usecase'
import { InputTransaction } from '@application/use-case/register-transaction/input-transaction'
import { OutputTransaction } from '@application/use-case/get-transaction-status/output-transaction'

export class TransactionController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'payer_pix_key', 'receiver_pix_key', 'value']
	private applicationHandle: usecase<InputTransaction, OutputTransaction>

	constructor(usecase: usecase<InputTransaction, OutputTransaction>) {
		this.applicationHandle = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.applicationHandle.handle(request.body)
			return created(result)
		} catch (err: any) {
			return errorMapper(err)
		}
	}

}