import { DataBaseConnection } from '@main/errors/data/data-base-connection-error'
import KnexAdpter from './knex-adpter'


export default class KnexAdpterSqlite3 extends KnexAdpter{
	
	async query(query: string): Promise<any> {
		try {
			const result = await this._database.raw(query)
			return result
		} catch (err){
			throw new DataBaseConnection()
		}
	}

}