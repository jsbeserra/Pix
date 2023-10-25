import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PosCreatePixKey = {
	'/account/create/pixkey': {
		'post': {
			'summary': 'Adiciona uma nova chave pix a uma conta',
			'tags': [
				'Contas'
			],
			'requestBody': {
				'description': 'Dados necessários',
				'required': true,
				'content': {
					'application/json': {
						'schema': {
							'type': 'object',
							'properties': {
								'cpf': {
									'type': 'string',
									'pattern': '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$',
									'description': 'CPF do titular da conta (formato: XXX.XXX.XXX-XX)'
								},
								'pix_key': {
									'type': 'string',
									'description': 'string'
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