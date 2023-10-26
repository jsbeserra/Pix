import { CommandHandler } from '@application/Handle'
import { InputDeletePixKey } from '@application/command/delete-pix-key/input-create-cpf'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { ok } from '@main/http/util'

export class DeletePixKeyController implements ControllerOperation {
	readonly requiredParams: string[] = ['cpf','pix_key']
	private command: CommandHandler<InputDeletePixKey, void>

	constructor(command: CommandHandler<InputDeletePixKey, void>) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			await this.command.handle(request.params)
			return ok()
		} catch (err: any) {
			return handleError(err)
		}
	}

}