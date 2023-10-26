import { CommandHandler } from '@application/Handle'
import { InputCreatePixKey } from '@application/gateway/pix-gateway'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class CreatePixController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'cpf', 'pix_key']
	private command: CommandHandler<InputCreatePixKey,void>

	constructor(command: CommandHandler<InputCreatePixKey,void>) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			await this.command.handle(request.body)
			return created()
		} catch (err: any) {
			return handleError(err)
		}
	}

}