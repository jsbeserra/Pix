import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const GetPixKey = {
	'/pixkey/{cpf}': {
		'get': {
			'summary': 'Busca dados de uma conta pix',
			'tags': [
				'PixKey'
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
									'pix_key': {
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