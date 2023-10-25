import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PostRefundTransactionPix = {
	'/transaction/pix/refund': {
		'post': {
			'summary': 'Estorna transações pix',
			'description':'Deve ser utilizado somente pelo proprio sistema pix',
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
								'cpf': {
									'type': 'string',
									'pattern': '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$',
									'description': 'CPF do pagador (formato: XXX.XXX.XXX-XX)'
								},
								'code': {
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
					'description': ''
				},
				...http400,
				...http500
			}
		}
	}
}