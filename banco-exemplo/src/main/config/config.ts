import 'dotenv/config'

export const environment = {
	mode: process.env.MODE,	
	PIX_API_URL: process.env.PIX_API_URL,
	BANK_ID: process.env.BANK_ID
}