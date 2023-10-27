
import { CommandHandler } from '@application/Handle'
import { InputDeposit } from '@application/command/deposit/input-deposit'
import errorMapper from '@main/errors/error-mapper'
import { ControllerOperation, HttpRequest, HttpResponse } from '@main/http/ports'
import { created } from '@main/http/util'

export class DepositController implements ControllerOperation {
	readonly requiredParams: string[] = [ 'value', 'payer_cpf', 'receiver_cpf']
	private command: CommandHandler<InputDeposit,void>

	constructor(command: CommandHandler<InputDeposit,void>) {
		this.command = command
	}

	async operation(request: HttpRequest): Promise<HttpResponse> {
		try {
			const result = await this.command.handle(request.body)
			return created(result)
		} catch (err: any) {
			return errorMapper(err)
		}
	}

}