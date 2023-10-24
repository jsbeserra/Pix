import 'dotenv/config'

export const databaseConfigPath =`${process.cwd()}/src/main/data-base/typeorm`
export const databaseTestConfigPath =`${process.cwd()}/tests/integration/typeorm`

export const environment = {
	mode: process.env.MODE,
	ACCOUNT_CACHE_EXPIRES_IN: process.env.ACCOUNT_CACHE_EXPIRES_IN ? parseInt(process.env.ACCOUNT_CACHE_EXPIRES_IN) : 3600,
	DB_PORT: process.env.DB_PORT,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DATABASE_NAME: process.env.DATABASE_NAME,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_HOST: process.env.REDIS_HOST,
	CACHE_EXPIRATION_TIME_IN_SECONDS: parseInt(process.env.CACHE_EXPIRATION_TIME_IN_SECONDS!),
	BASE_URL: process.env.BASE_URL,
	AUTORIZATION_PUBLIC_KEY: process.env.AUTORIZATION_PUBLIC_KEY
}