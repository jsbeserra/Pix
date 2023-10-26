export class ApplicationError extends Error {}
export class PixKeyNotFound extends ApplicationError {
	public readonly name = 'Pix key not found'
	constructor () {
		super('pix key not found')
	}
}

export class PixAccountOwnershipError extends ApplicationError {
	public readonly name = 'Pix Account Ownership Error'
	constructor () {
		super('PixKey belongs to the informed CPF')
	}
}
