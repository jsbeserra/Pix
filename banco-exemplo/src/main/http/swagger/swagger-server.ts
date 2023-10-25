import { environment } from '@main/config/config'
import { PostCreateAccount } from './routes/post-create-account'
import { DeletePixKey } from './routes/delete-pix-key'
import { GetAccount } from './routes/get-account'
import { PosCreatePixKey } from './routes/post-create-pix-key'
import { PostTransactionPix } from './routes/post-transaction-pix'
import { PostRefundTransactionPix } from './routes/post-refund-transaction-pix'
import { PostDepositTransactionPix } from './routes/post-deposit-transaction-pix'
import { DeleteAccount } from './routes/delete-account'

export const swaggerServer = {
	'openapi': '3.0.0',
	'info': {
		'title': 'API do Banco',
		'version': '1.0.0',
		'description': 'Api de gestão bancaria'
	},
	'securityDefinitions': {
		'jwt_auth': {
			'type': 'apiKey',
			'name': 'Authorization',
			'in': 'header',
			'description': 'token'
		}
	},
	'servers': [
		{
			'url': environment.BASE_URL,
			'description': 'local server url'
		}
	],
	'paths': {
		...PostCreateAccount,
		...DeleteAccount,
		...GetAccount,
		...PosCreatePixKey,
		...DeletePixKey,
		...PostTransactionPix,
		...PostDepositTransactionPix,
		...PostRefundTransactionPix,
	}
}