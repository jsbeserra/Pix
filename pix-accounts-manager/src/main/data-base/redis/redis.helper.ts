import Redis from 'ioredis'

export const RedisHelper = {
	client: Redis,
	async connect (redisIntance:Redis) : Promise<void> {
		this.client = redisIntance
		// this.client = new Redis({
		// 	host: 'localhost',
		// 	port: 6379,
		// 	password: 'suaSenha'
		// })
	},
	async disconect(): Promise<void>{
		await this.client.disconnect()
	},
	async set(key:string, value:string,expireIn:number): Promise<void>{
		await this.client.setex(key,expireIn,value)
	},
	async get(key:string): Promise<string>{
		return await this.client.get(key)
	},
	async remove(key:string): Promise<void>{
		await this.client.del(key)
	}
}
