import { DataSource, EntityManager, Repository } from 'typeorm'
import Account from './entity/Account'
import path from 'path'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'

export default class TypeOrmHelperAdpterMemory implements ITypeOrmAdpter{
	client: DataSource
	private databaseConfigPath =`${process.cwd()}/tests/integration/typeorm`

	constructor(){}
	async connect () : Promise<any> {
		this.client = new DataSource({
			type: 'sqlite',
			database: ':memory:',
			synchronize: true,
			logging: false,
			entities: [path.resolve(this.databaseConfigPath,'entity','*.ts')],
			migrations: [],
			subscribers: []
		})
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