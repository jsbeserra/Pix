export default interface IDatabaseConnection {
	query (query:string): Promise<any>;
	save (statement: string, params: any): Promise<any>;
	connect (): Promise<void>;
	close (): Promise<void>;
	transcation (callback: () => Promise<void>):Promise<void>
}