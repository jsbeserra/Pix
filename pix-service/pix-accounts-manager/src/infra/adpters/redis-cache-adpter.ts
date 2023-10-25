import ICache from '@application/interfaces/data/cache/icache'
import { RedisHelper } from '@main/data-base/redis/redis.helper'

export default class RedisCacheAdpter implements ICache {

	async find(key: string): Promise<string> {
		return await RedisHelper.get(key)
	}
    
	async create(key: string, data: string, expireIn: number): Promise<void> {
		await RedisHelper.set(key,data,expireIn)
	}

	async remove(key: string): Promise<void> {
		await RedisHelper.remove(key)
	}
    
}