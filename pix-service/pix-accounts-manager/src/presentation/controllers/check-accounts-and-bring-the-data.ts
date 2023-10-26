import { InputcheckAccountsAndBringTheData } from '@application/usecase/check-accounts-and-bring-the-data/input-check-accounts-and-bring-the-data'
import { OutPutcheckAccountsAndBringTheData } from '@application/usecase/check-accounts-and-bring-the-data/output-check-accounts-and-bring-the-data'
import { usecase } from '@application/usecase/usecase'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { ok } from '@main/http/util'


export class CheckAccountsAndBringTheDataAccountController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'payer_pix_key','receiver_pix_key' ]
	private usecase: usecase<InputcheckAccountsAndBringTheData,OutPutcheckAccountsAndBringTheData>
	
	constructor(usecase: usecase<InputcheckAccountsAndBringTheData,OutPutcheckAccountsAndBringTheData>) {
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