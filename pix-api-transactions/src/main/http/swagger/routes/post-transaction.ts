import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PostTransaction = {
	'/transaction': {
		'post': {
			'summary': 'Efetua uma transferencia bancaria',
			'tags': [
				'Transaction'
			],
			'requestBody': {
				'description': 'Dados para a transação',
				'required': true,
				'content': {
					'application/json': {
						'schema': {
							'type': 'object',
							'properties': {
								'payer_pix_key': {
									'type': 'string',
									'description': 'string'
								},
								'receiver_pix_key': {
									'type': 'string',
									'description': 'string'
								},
								'value': {
									'type': 'number',
									'description': 10.50
								}
							}
						}
					}
				}
			},
			'responses': {
				'201': {
					'description': '',
					'content': {
						'application/json': {
							'schema': {
								'type': 'object',
								'properties': {
									'code': {
										'type': 'string',
										'example': 'string'
									},
									'status': {
										'type': 'string',
										'example': 'pending'
									}
								}
							}
						}
					}
				},
				...http400,
				...http500
			}
		}
	},
}