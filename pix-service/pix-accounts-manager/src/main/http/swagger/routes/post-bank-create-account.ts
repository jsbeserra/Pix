import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PostBankCreateAccount = {
	'/bank/account/create': {
		'post': {
			'summary': 'Cria contas para intituições bancarias',
			'tags': [
				'Bank'
			],
			'requestBody': {
				'description': 'Dados da conta a ser criada',
				'required': true,
				'content': {
					'application/json': {
						'schema': {
							'type': 'object',
							'properties': {
								'name': {
									'type': 'string',
									'pattern': 'string',
									'description': 'Nome da instituição'
								},
								'url_for_transaction': {
									'type': 'string',
									'description': 'endpoint para transferencias bancaria'
								},
								'webhook_notification': {
									'type': 'string',
									'description': 'enpoint para avisar quando a transação for concluida'
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
									'id': {
										'type': 'string',
										'example': 'string'
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
	}
}