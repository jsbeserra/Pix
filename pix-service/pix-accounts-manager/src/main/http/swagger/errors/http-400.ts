export const http400 = {
	'400': {
		'description': 'Requisição inválida',
		'content': {
			'application/json': {
				'examples': {
					'exemplo-2': {
						'value': {
							'message': 'error message',
							'error': 'Error'
						}
					}
				}
			}
		}
	}
}