import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PostCreateAccount = {
	'/account/create': {
		'post': {
			'summary': 'Cria uma nova conta',
			'tags': [
				'Contas'
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
									'description': 'CPF do titular da conta (formato: XXX.XXX.XXX-XX)'
								},
								'name': {
									'type': 'string',
									'description': 'Nome do titular da conta'
								},
								'motherName': {
									'type': 'string',
									'description': 'Nome do titular da conta'
								},
								'dateOfBirth': {
									'type': 'string',
									'format': 'date',
									'description': 'Nome do titular da conta'
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