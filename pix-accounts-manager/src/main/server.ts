import 'reflect-metadata'
import http from 'http'
import 'dotenv/config'
import ExpressHttpServer from './http/express/ExpressHttpServer'
import { RedisHelper } from './data-base/redis/redis.helper'
import { Redis } from 'ioredis'
import TypeOrmHelperAdpterPostgress from './data-base/typeorm/typeorm-adpter-postgres'
import { environment } from './config/config'


RedisHelper.connect(new Redis({
	host: environment.REDIS_HOST!,
	port: parseInt(environment.REDIS_PORT!),
	password: environment.REDIS_PASSWORD
})).then(()=>{
	console.log('Redis connected')
}).catch((err)=>{
	console.log(err.message)
})

async function server() {
	await connectDataBases()
	const httpServerExpress = new ExpressHttpServer()
	const httpServer = http.createServer(httpServerExpress.app)
	httpServer.listen(process.env.PORT,()=>{
		console.log('Pix accounts server started!')
	})
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