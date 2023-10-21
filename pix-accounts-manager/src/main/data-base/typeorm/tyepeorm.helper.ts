import path from 'path'
import { DataSource, Repository } from 'typeorm'
import Account from './entity/Account'
import { Bank } from './entity/Bank'
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
	getAccountEntity (): Repository<Account> {
		return this.client.getRepository(Account)
	},
	getBankEntity (): Repository<Bank> {
		return this.client.getRepository(Bank)
	},
}
