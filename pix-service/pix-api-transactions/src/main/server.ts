import 'reflect-metadata'
import http from 'http'
import 'dotenv/config'
import AMQPClientAdpter from '@infra/adpters/amqpclient-queue-adpter'
import ExpressHttpServer from '@infra/http/express/ExpressHttpServer'
import { environment } from './config/config'
import TypeOrmHelperAdpterPostgress from './data-base/typeorm/typeorm-adpter-postgres'
import { makeProcessTransactionConsumer } from './factories/make-process-transaction-consumer'




async function server() {
	await AMQPClientAdpter.getInstance().connect(environment.AMQP_CONNECTION_STRING!).then(()=>{
		console.log('Conectado ao amqp!')
	}).catch((err)=>{
		console.log('Falha ao conectar com amqp')
		console.log(err.message)
	})
	await connectDataBases()
	const httpServerExpress = new ExpressHttpServer()
	const httpServer = http.createServer(httpServerExpress.app)
	httpServer.listen(process.env.PORT,()=>{
		console.log('Pix accounts server started!' + ' port:'+process.env.PORT)
	})
	makeProcessTransactionConsumer(AMQPClientAdpter.getInstance())
}

async function connectDataBases() {
	await TypeOrmHelperAdpterPostgress.instance().connect()
		.then(()=>console.log('Data base connected'))
		.catch(err=> {
			console.log('Erro in postgress')
			console.log(err)
		})
}

server()