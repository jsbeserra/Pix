import http from 'http'
import 'dotenv/config'
import ExpressHttpServer from './http/express/ExpressHttpServer'

async function server() {
	//const teste = new KnexAdpter(environment.mode!)
	//await teste.connect()
	//await teste.runMigrations()
	const httpServerExpress = new ExpressHttpServer()
	const httpServer = http.createServer(httpServerExpress.app)
	httpServer.listen(process.env.PORT,()=>{
		console.log('Server started!')
	})
}

server()