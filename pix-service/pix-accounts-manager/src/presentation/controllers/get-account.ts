
import { usecase } from '@application/usecase/usecase'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { ok } from '@main/http/util'

export class GetPixKeyController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'cpf' ]
	private usecase: usecase<string,string[] | undefined>
	
	constructor(usecase: usecase<string,string[] | undefined>) {
		this.usecase = usecase
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			console.log(request)
			const result = await this.usecase.handle(request.params.cpf)
			return ok(result)
		} catch (err: any) {
			return handleError(err)
		}
	}

}