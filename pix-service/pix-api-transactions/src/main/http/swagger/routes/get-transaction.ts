import { http400 } from '../errors/http-400'
import { http500 } from '../errors/http-500'

export const GetTransactionEndpoint = {
	'/transaction/{code}': {
		'get': {
			'summary': 'Busca o status de um transação',
			'tags': [
				'Transaction'
			],
			'parameters': [
				{
					'in': 'path',
					'name': 'code',
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
									'status': {
										'type': 'string',
										'example': 'success'
									},
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