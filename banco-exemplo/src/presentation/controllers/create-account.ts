import { CommandHandler } from '@application/Handle'
import { InputCreateAccount } from '@application/command/create-account/input-create-account'
import errorMapper from '@main/errors/error-mapper'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class CreateAccountController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'name', 'cpf', 'motherName', 'dateOfBirth']
	private command: CommandHandler<InputCreateAccount,void>

	constructor(command: CommandHandler<InputCreateAccount,void>) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			await this.command.handle(request.body)
			return created()
		} catch (err: any) {
			return errorMapper(err)
		}
	}

}