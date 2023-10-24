import { environment } from '@main/config/config'
import { GetTransactionEndpoint } from './routes/get-transaction'
import { PostTransaction } from './routes/post-transaction'

export const swaggerServer = {
	'openapi': '3.0.0',
	'info': {
		'title': 'API de Transferencias Bancarias',
		'version': '1.0.0',
		'description': 'Documentação da API Transferencias Bancarias'
	},
	'servers': [
		{
			'url': environment.BASE_URL,
			'description': 'local server url'
		}
	],
	'paths': {
		...GetTransactionEndpoint,
		...PostTransaction
	}
}