import { http400 } from '../errors/http-400'
import { http401 } from '../errors/http-401'
import { http500 } from '../errors/http-500'

export const GetPixKeyTwoDetails = {
	'/pixkey/two/details/{pixkey}/{pixkey2}': {
		'get': {
			'summary': 'Busca dados de duas contas',
			'tags': [
				'PixKey'
			],
			'security': [
				{
					'jwt_auth': []
				}
			],
			'parameters': [
				{
					'in': 'path',
					'name': 'pixkey',
					'required': true,
					'schema': {
						'type': 'string'
					}
				},
				{
					'in': 'path',
					'name': 'pixkey2',
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
									'payer': {
										'type': 'object',
										'properties': {
											'cpf': {
												'type': 'string',
												'example': '90520398017'
											},
											'pix_key': {
												'type': 'string',
												'example': 'xxxxxxxx'
											},
											'url_for_transaction': {
												'type': 'string',
												'example': 'https://exemplo.com/'
											},
											'webhook_notification': {
												'type': 'string',
												'example': 'https://exemplo.com/'
											}
										}
									},
									'receiver': {
										'type': 'object',
										'properties': {
											'cpf': {
												'type': 'string',
												'example': '66487422088'
											},
											'pix_key': {
												'type': 'string',
												'example': '123qwert'
											},
											'url_for_transaction': {
												'type': 'string',
												'example': 'https://exemplo.io/'
											},
											'webhook_notification': {
												'type': 'string',
												'example': 'https://exemplo.io/'
											}
										}
									}
								}
							}
						}
					}
				},
				...http401,
				...http400,
				...http500

			}
		}
	}
}