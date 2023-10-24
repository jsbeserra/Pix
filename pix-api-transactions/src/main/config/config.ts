import 'dotenv/config'

export const databaseConfigPath =`${process.cwd()}/src/main/data-base/typeorm`
export const databaseTestConfigPath =`${process.cwd()}/tests/integration/typeorm`

export const environment = {
	BASE_URL: process.env.BASE_URL,
	DB_PORT: process.env.DB_PORT,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DATABASE_NAME: process.env.DATABASE_NAME,
	PIX_ACCOUNTS_MANAGER_URL: process.env.PIX_ACCOUNTS_MANAGER_URL,
	AMQP_CONNECTION_STRING: process.env.AMQP_CONNECTION_STRING
}