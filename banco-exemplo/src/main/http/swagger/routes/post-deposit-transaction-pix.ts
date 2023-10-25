import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PostDepositTransactionPix = {
	'/transaction/pix/deposit': {
		'post': {
			'summary': 'Realiza um deposito',
			'description':'Deve ser utilizado somente pelo proprio sistema pix',
			'tags': [
				'webhook'
			],
			'requestBody': {
				'description': 'Deve ser utilizado por serviços externos para realizar depositos',
				'required': true,
				'content': {
					'application/json': {
						'schema': {
							'type': 'object',
							'properties': {
								'payer_cpf': {
									'type': 'string',
									'pattern': '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$',
									'description': 'CPF do titular da conta (formato: XXXXXXXXXXX)'
								},
								'receiver_cpf': {
									'type': 'string',
									'pattern': '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$',
									'description': 'CPF do titular da conta (formato: XXXXXXXXXXX)'
								},
								'value': {
									'type': 'number',
									'description': '50.25'
								}
							}
						}
					}
				}
			},
			'responses': {
				'201': {
					'description': ''
				},
				...http400,
				...http500
			}
		}
	}
}