export default interface IDatabaseConnection {
	query (query:string): Promise<any>;
	save (query:string): Promise<any>;
	connect (): Promise<void>;
	close (): Promise<void>;
}