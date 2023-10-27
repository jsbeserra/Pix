import errorMapper from '@main/errors/error-mapper'
import { QueryHandler } from '@application/Handle'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { ok } from '@main/http/util'
import { OutPutAccount } from '@application/query/get-account/out-put-get-account'


export class GetAccountController implements ControllerOperation {
	readonly requiredParams: string[] = ['cpf']
	private command: QueryHandler<string,OutPutAccount>

	constructor(command: QueryHandler<string,OutPutAccount>) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const account = await this.command.handle(request.params.cpf)
			return ok(account)
		} catch (err: any) {
			return errorMapper(err)
		}
	}

}