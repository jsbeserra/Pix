import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const PostCreatePixKey = {
	'/pixkey': {
		'post': {
			'summary': 'Cria uma nova conta pix',
			'tags': [
				'Contas'
			],
			'security': [
				{
					'jwt_auth': []
				}
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
									'description': 'CPF equivale ao numero da conta bancaria'
								},
								'bank_id': {
									'type': 'string',
									'description': 'id do da instituição bancaria'
								},
								'pix_key': {
									'type': 'string',
									'description': 'Chave PIX: deve conter no máximo 5 caracteres e no máximo 10, somente letras e números são aceitos.'
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