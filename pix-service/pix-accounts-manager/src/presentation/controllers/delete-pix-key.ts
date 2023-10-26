
import { InputDeletePixAccount } from '@application/usecase/delete-pix-key/input-delete-pix-key'
import { usecase } from '@application/usecase/usecase'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class DeletePixKeyController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'pix_key', 'cpf' ]
	private usecase: usecase<InputDeletePixAccount,void>
	
	constructor(usecase: usecase<InputDeletePixAccount,void>) {
		this.usecase = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.usecase.handle(request.params)
			return created(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}