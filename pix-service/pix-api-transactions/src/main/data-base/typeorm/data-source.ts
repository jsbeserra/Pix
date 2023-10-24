import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: ':memory:',
	synchronize: false,
	logging: false,
	entities: [path.resolve(`${__dirname}/entity/*.ts`)],
	migrations: [
		path.resolve(`${__dirname}/migrations/*{.ts,.js}`)
	],
	subscribers: [],
})
