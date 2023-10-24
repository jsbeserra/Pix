export const http401 = {
	'401': {
		'description': 'Unauthorized',
		'content': {
			'application/json': {
				'examples': {
					'exemplo': {
						'value': {
							'message': 'Invalid authorization token.'
						}
					}
				}
			}
		}
	}
}