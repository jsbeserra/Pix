import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const DeletePixKey = {
	'/pixkey/{pix_key}': {
		'delete': {
			'summary': 'Deleta chave pix',
			'tags': [
				'Contas'
			],
			'parameters': [
				{
					'in': 'path',
					'name': 'pix_key',
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