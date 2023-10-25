export const http500 = {
	'500': {
		'description': 'Requisição inválida',
		'content': {
			'application/json': {
				'examples': {
					'exemplo': {
						'value': {
							'message': 'Internal server error',
							'error': 'Error'
						}
					}
				}
			}
		}
	}
}