export default interface ITypeOrmAdpter {
    connect () : Promise<any> 
	disconect(): Promise<void>
	runMigrations(): Promise<any>
	manager():any
	getAccountEntity (): any 
}