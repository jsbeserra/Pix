import { DataSource, EntityManager, Repository } from 'typeorm'
import path from 'path'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import { environment } from '@main/config/config'
import Account from './entity/Account'

export default class TypeOrmHelperAdpter implements ITypeOrmAdpter {
	private client: DataSource
	private static _instance:TypeOrmHelperAdpter

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

	static instance(): TypeOrmHelperAdpter {
		if (!TypeOrmHelperAdpter._instance) TypeOrmHelperAdpter._instance = new TypeOrmHelperAdpter()
		return TypeOrmHelperAdpter._instance
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
	getAccountEntity (): Repository<Account> {
		return this.client.getRepository(Account)
	}
}