export const http400 = {
	'400': {
		'description': 'Requisição inválida',
		'content': {
			'application/json': {
				'examples': {
					'exemplo': {
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