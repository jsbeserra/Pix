import type { Knex } from 'knex'

// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
	development: {
		client: 'sqlite3',
		connection: ':memory:',
		useNullAsDefault: true,
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './src/main/data-base/knex/migrations'
		}
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user:     'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './src/main/data-base/knex/migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'bancoTeste',
			user:     'admin',
			password: '123@Mudar',
			port: 5432
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './src/main/data-base/knex/migrations'
		}
	}

}

export default knexConfig