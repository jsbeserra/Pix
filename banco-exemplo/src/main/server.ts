import http from 'http'
import 'dotenv/config'
import ExpressHttpServer from './http/express/ExpressHttpServer'
import TypeOrmHelperAdpter from './data-base/typeorm/typeorm-adpter-postgres'

async function server() {
	await connectDataBases()
	const httpServerExpress = new ExpressHttpServer()
	const httpServer = http.createServer(httpServerExpress.app)
	httpServer.listen(process.env.PORT,()=>{
		console.log('Server started!')
	})
}

async function connectDataBases() {
	await TypeOrmHelperAdpter.instance().connect()
		.then(()=>console.log('Data base connected'))
		.catch(err=> {
			console.log(err)
		})
}

server()