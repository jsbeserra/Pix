import http from 'http'
import 'dotenv/config'
import ExpressHttpServer from './http/express/ExpressHttpServer'
import TypeOrmHelperAdpter from './data-base/typeorm/typeorm-adpter-postgres'

async function server() {
	await connectDataBases()
	const httpServerExpress = new ExpressHttpServer()
	const httpServer = http.createServer(httpServerExpress.app)
	httpServer.listen(process.env.PORT,()=>{
		console.log('🚀 Server Active: The server is up and running successfully!')
		console.log(`🌐 Port: ${process.env.PORT}`)
	})
}

async function connectDataBases() {
	await TypeOrmHelperAdpter.instance().connect()
		.then(()=>console.log('🎉 Database Connected: Successfully connected to the database.'))
		.catch(err=> {
			console.log(err.message)
		})
}

server()