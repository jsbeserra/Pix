import { DataSource, EntityManager, Repository } from 'typeorm'
import path from 'path'
import ITypeOrmAdpter from '@infra/itypeorm-adpter'
import Transactions from './entity/TransactionsData'


export default class TypeOrmHelperAdpterMemory implements ITypeOrmAdpter {
	client: DataSource
	private databaseConfigPath =`${process.cwd()}/tests/main/typeorm`

	constructor(){}

	async connect () : Promise<any> {
		this.client = new DataSource({
			type: 'sqlite',
			database: ':memory:',
			synchronize: true,
			logging: false,
			entities: [path.resolve(this.databaseConfigPath,'entity','*.ts')],
			migrations: [path.resolve(this.databaseConfigPath,'migrations','*.ts')],
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
	getTransactionEntity() :Repository<Transactions>{
		return this.client.getRepository(Transactions)
	}
}