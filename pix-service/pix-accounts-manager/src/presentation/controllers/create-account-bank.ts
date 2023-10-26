
import InputCreateAccountBank from '@application/usecase/create-account-bank/input-create-account-ban'
import { usecase } from '@application/usecase/usecase'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class CreateAccountBankController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'name', 'url_for_transaction', 'url_for_refund']
	private usecase: usecase<InputCreateAccountBank,{id:string}>
	
	constructor(usecase: usecase<InputCreateAccountBank,{id:string}>) {
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