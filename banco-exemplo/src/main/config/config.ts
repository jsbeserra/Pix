import 'dotenv/config'

export const environment = {
	mode: process.env.MODE,	
	PIX_API_URL: process.env.PIX_API_URL,
	BANK_ID: process.env.BANK_ID,
	DB_PORT: process.env.DB_PORT,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DATABASE_NAME: process.env.DATABASE_NAME
}