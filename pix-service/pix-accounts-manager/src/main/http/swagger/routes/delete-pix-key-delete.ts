import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const DeletePixKey = {
	'/pixkey/{pix_key}/{cpf}': {
		'delete': {
			'summary': 'Deleta chave pix',
			'tags': [
				'PixKey'
			],
			'parameters': [
				{
					'in': 'path',
					'name': 'pix_key',
					'required': true,
					'schema': {
						'type': 'string'
					}
				},
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
					'description': ''
				},
				...http400,
				...http500

			}
		}
	},
}