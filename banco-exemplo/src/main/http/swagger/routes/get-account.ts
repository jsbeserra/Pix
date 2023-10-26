import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const GetAccount = {
	'/account/{cpf}': {
		'get': {
			'summary': 'Busca os dados de uma conta bancaria',
			'tags': [
				'Contas'
			],
			'parameters': [
				{
					'in': 'path',
					'name': 'cpf',
					'required': true,
					'schema': {
						'type': 'string'
					}
				}
			],
			'responses': {
				'200': {
					'description': '',
					'content': {
						'application/json': {
							'schema': {
								'type': 'object',
								'properties': {
									'name': {
										'type': 'string',
										'example': 'string'
									},
									'pix_keys': {
										'type': 'array',
										'items': {
											'type': 'string',
											'example': 'string'
										}
									},
									'balance': {
										'type': 'number',
										'example': '1000'
									},
									'mother_name': {
										'type': 'string',
										'example': 'string'
									},
									'opening_date': {
										'type': 'string',
										'format': 'date-time',
										'example': '2023-10-27T00:08:44.520Z'
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