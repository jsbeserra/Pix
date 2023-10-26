import { CommandHandler } from '@application/Handle'
import { InputDeleteAccount } from '@application/command/delete-account/input-delete-account'
import handleError from '@main/errors/handleError'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { ok } from '@main/http/util'

export class DeleteAccountController implements ControllerOperation {
	readonly requiredParams: string[] = ['cpf','dateOfBirth']
	private command: CommandHandler<InputDeleteAccount,void>

	constructor(command: CommandHandler<InputDeleteAccount,void>) {
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