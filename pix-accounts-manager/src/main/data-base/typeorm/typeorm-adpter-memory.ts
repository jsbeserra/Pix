import { DataSource } from 'typeorm'
import IDatabaseConnection from '../../../application/interfaces/data/connection/Idatabase-connection'
import path from 'path'
import { DataBaseConnection } from '@main/errors/data/data-base-connection-error'


export default class TypeOrmAdpterMemory implements IDatabaseConnection {
	private _database:DataSource
	private static intance:TypeOrmAdpterMemory

	private constructor(){
		const databaseConfigPath =`${process.cwd()}/src/main/data-base/typeorm`
		this._database = new DataSource({
			type: 'sqlite',
			database: ':memory:',
			synchronize: false,
			logging: false,
			entities: [path.resolve(databaseConfigPath,'entity','*.ts')],
			migrations: [path.resolve(databaseConfigPath,'migrations','*.ts')],
			subscribers: []
		})
		
	}

	public static getIntance(): TypeOrmAdpterMemory {
		if (!TypeOrmAdpterMemory.intance) TypeOrmAdpterMemory.intance = new TypeOrmAdpterMemory()
		return TypeOrmAdpterMemory.intance
	}
	
	async query(query: string): Promise<any> {
		try {
			return await this._database.query(query)
		} catch (err){
			console.log(err)
			throw new DataBaseConnection()
		}
	}

	async save(statement: string, params: any): Promise<any> {
		try {
			return await this._database.query(statement, params)
		} catch (err){
			console.log(err)
			throw new DataBaseConnection()
		}
	}

	public async connect(): Promise<any> {
		await this._database.initialize()
	}

	public async close(): Promise<void> {
		await this._database.destroy()
	}

	public async runMigrations(): Promise<any> {
		return await this._database.runMigrations()
	}

	public async downMigrations(): Promise<void> {
		return await this._database.undoLastMigration()
	}
}