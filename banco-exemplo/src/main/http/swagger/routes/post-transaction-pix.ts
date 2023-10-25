import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PostTransactionPix = {
	'/transaction/pix': {
		'post': {
			'summary': 'Realiza transações utilizando o pix',
			'tags': [
				'Transaction-pix'
			],
			'requestBody': {
				'description': 'Dados da conta a ser criada',
				'required': true,
				'content': {
					'application/json': {
						'schema': {
							'type': 'object',
							'properties': {
								'payer_cpf': {
									'type': 'string',
									'pattern': '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$',
									'description': 'CPF do pagador (formato: XXX.XXX.XXX-XX)'
								},
								'receiver_pixkey': {
									'type': 'string',
									'description': 'string'
								},
								'value': {
									'type': 'number',
									'description': '200'
								}
							}
						}
					}
				}
			},
			'responses': {
				'201': {
					'description': 'Conta criada com sucesso'
				},
				...http400,
				...http500
			}
		}
	}
}