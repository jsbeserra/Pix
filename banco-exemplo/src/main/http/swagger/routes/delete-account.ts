import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const DeleteAccount = {
	'/account/delete/{cpf}/{dateOfBirth}': {
		'delete': {
			'summary': 'Deleta uma conta',
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
					'name': 'dateOfBirth',
					'required': true,
					'schema': {
						'type': 'date'
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