import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import swaggerUi from 'swagger-ui-express'
import { swaggerServer } from './swagger/swagger-server'

const options = {
	swaggerOptions: {
		docExpansion: 'list',
	},
}
  
export default (app: Express): void => {
	const router = Router()
	app.get('/', (req, res) => {
		res.redirect(`${process.env.BASE_URL}/documentation`)
	})
	app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerServer, options))
	app.use('/api', router,swaggerUi.serve)
	readdirSync(`${__dirname}/./routes`).map(async file => {
		(await import(`${__dirname}/./routes/${file}`)).default(router)
	})
}