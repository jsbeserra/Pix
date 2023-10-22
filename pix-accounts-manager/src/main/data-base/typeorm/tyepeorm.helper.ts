import path from 'path'
import { DataSource, Repository, EntityManager } from 'typeorm'
import Account from './entity/Account'
import { Bank } from './entity/Bank'
import HistoryAccount from './entity/History'
const databaseConfigPath =`${process.cwd()}/src/main/data-base/typeorm`

export const TypeOrmHelper = {
	client: DataSource,
	async connect () : Promise<void> {
		this.client = new DataSource({
			type: 'sqlite',
			database: ':memory:',
			synchronize: true,
			logging: false,
			entities: [path.resolve(databaseConfigPath,'entity','*.ts')],
			migrations: [path.resolve(databaseConfigPath,'migrations','*.ts')],
			subscribers: []
		})
		await this.client.initialize()
	},
	async disconect(): Promise<void>{
		await this.client.destroy()
	},
	runMigrations(): Promise<any>{
		return this.client.runMigrations()
	},
	manager():EntityManager{
		return this.client.manager
	},
	getAccountEntity (): Repository<Account> {
		return this.client.getRepository(Account)
	},
	getBankEntity (): Repository<Bank> {
		return this.client.getRepository(Bank)
	},
	getHistoryAccountEntity (): Repository<HistoryAccount> {
		return this.client.getRepository(HistoryAccount)
	},
}
