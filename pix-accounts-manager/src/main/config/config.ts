import 'dotenv/config'

export const environment = {
	mode: process.env.MODE,
	ACCOUNT_CACHE_EXPIRES_IN: process.env.ACCOUNT_CACHE_EXPIRES_IN ? parseInt(process.env.ACCOUNT_CACHE_EXPIRES_IN) : 3600
}