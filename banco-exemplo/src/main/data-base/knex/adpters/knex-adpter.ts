import { DataBaseConnection } from '@main/errors/data/data-base-connection-error'
import { TransactionFailed } from '@main/errors/data/transaction-error'
import knex from 'knex'
import knexConfig from '../../../../../knexfile'

export default abstract class KnexAdpter {
	public _database:knex.Knex<any, unknown[]>

	constructor(readonly environment:string){
		this.connect()
	}

	get database():knex.Knex<any, unknown[]>{
		return this._database
	}
	
	async query(query: string): Promise<any> {}

	async save(query: string): Promise<any> {
		const transaction = await this._database.transaction()
		try {
			await transaction.raw(query)
			await transaction.commit()
		} catch (err:any){
			await transaction.rollback()
			throw new TransactionFailed(err.message)
		}
		return
	}

	public async connect(): Promise<any> {
		try {
			const knexCfg = knexConfig[this.environment]
			this._database = knex(knexCfg)
			await this.runMigrations()
		} catch (err){
			console.log(err)
			throw new DataBaseConnection()
		}
	}

	public async close(): Promise<void> {
		await this._database.destroy()
	}

	public async runMigrations(): Promise<void> {
		await this._database.migrate.latest()
	}

	public async downMigrations(): Promise<void> {
		await this._database.migrate.down()
	}
}