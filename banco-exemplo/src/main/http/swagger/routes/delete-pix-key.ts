import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const DeletePixKey = {
	'/account/delete/pixkey/{cpf}/{pix_key}': {
		'delete': {
			'summary': 'Deleta uma chave pix.',
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
				},
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