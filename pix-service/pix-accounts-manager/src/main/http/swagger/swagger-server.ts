import { environment } from '@main/config/config'
import { PostCreatePixKey } from './routes/post-pix-key-create'
import { DeletePixKey } from './routes/delete-pix-key-delete'
import { PostBankCreateAccount } from './routes/post-bank-create-account'
import { GetPixKeyTwoDetails } from './routes/get-pix-key-two-details'
import { GetPixKey } from './routes/get-pix-key-details'

export const swaggerServer = {
	'openapi': '3.0.0',
	'info': {
		'title': 'PIX ACCOUNTS MANAGER API',
		'version': '1.0.0',
		'description': 'API de Gestão De Contas Pix'
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
		...PostCreatePixKey,
		...DeletePixKey,
		...GetPixKey,
		...GetPixKeyTwoDetails,
		...PostBankCreateAccount
	}
}