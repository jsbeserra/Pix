import { Repository } from 'typeorm'
import Account from './entity/Account'
import { Bank } from './entity/Bank'
import PixKey from './entity/PixKey'
import HistoryAccount from './entity/History'

export default interface ITypeOrmAdpter {
    connect () : Promise<any> 
	disconect(): Promise<void>
	runMigrations(): Promise<any>
	manager():any
	getAccountEntity (): Repository<Account> 
	getPixKeyEntity (): Repository<PixKey> 
	getBankEntity (): Repository<Bank>
	getHistoryAccountEntity(): Repository<HistoryAccount>
}