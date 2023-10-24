import { DataSource, EntityManager, Repository } from 'typeorm'
import path from 'path'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import { environment } from '@main/config/config'
import Transaction from './entity/Transaction'

export default class TypeOrmHelperAdpterPostgress implements ITypeOrmAdpter {
	private client: DataSource
	static _instance:TypeOrmHelperAdpterPostgress

	private databaseConfigPath =`${process.cwd()}/src/main/data-base/typeorm`

	private constructor(){
		this.client = new DataSource({
			type: 'postgres',
			host: 'localhost',
			port: parseInt(environment.DB_PORT!),
			username: environment.DB_USER,
			password: environment.DB_PASSWORD,
			database: environment.DATABASE_NAME,
			synchronize: true,
			logging: false,
			entities: [path.resolve(this.databaseConfigPath,'entity','*.ts')],
			migrations: [path.resolve(this.databaseConfigPath,'migrations','*.ts')],
			subscribers: []
		})
		
	}

	static instance(): TypeOrmHelperAdpterPostgress {
		if (!TypeOrmHelperAdpterPostgress._instance) TypeOrmHelperAdpterPostgress._instance = new TypeOrmHelperAdpterPostgress()
		return TypeOrmHelperAdpterPostgress._instance
	}
	async connect () : Promise<any> {
		return await this.client.initialize()
	}

	async disconect(): Promise<void>{
		await this.client.destroy()
	}

	async runMigrations(): Promise<any>{
		return this.client.runMigrations()
	}
	manager():EntityManager{
		return this.client.manager
	}
	getTransactionEntity (): Repository<Transaction> {
		return this.client.getRepository(Transaction)
	}
}