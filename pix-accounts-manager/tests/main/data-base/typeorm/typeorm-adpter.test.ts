import TypeOrmAdpterMemory from '@main/data-base/typeorm/typeorm-adpter-memory'
import { DataBaseConnection } from '@main/errors/data/data-base-connection-error'
import { DataSource } from 'typeorm'


// test('Should create a valid instance of typeorm', ()=>{
// 	const typeorm = TypeOrmAdpterMemory.getIntance()
// 	expect(typeorm._database).toBeInstanceOf(DataSource)
// })

// test('Sholud connect to the bank',async ()=>{
// 	const typeorm = TypeOrmAdpterMemory.getIntance()
// 	await typeorm.connect()
// 	expect(typeorm._database.isInitialized).toBe(true)
// 	await typeorm.close()
// })

// test('Should close a connection',async ()=>{
// 	const typeorm = TypeOrmAdpterMemory.getIntance()
// 	await typeorm.connect()
// 	await typeorm.close()
// 	expect(typeorm._database.isInitialized).toBe(false)
// })

test('Should create migrations',async ()=>{
	const typeorm = TypeOrmAdpterMemory.getIntance()
	await typeorm.connect()
	const migrations = await typeorm.runMigrations()
	expect(migrations.length).toBeGreaterThan(0)
	await typeorm.close()
})

test('Should fail when performing a query',async ()=>{
	const typeorm = TypeOrmAdpterMemory.getIntance()
	await typeorm.connect()
	expect(async()=> await typeorm.query('')).rejects.toThrow(new DataBaseConnection())
	await typeorm.close()
})

test('Should fail when performing a save',async ()=>{
	const typeorm = TypeOrmAdpterMemory.getIntance()
	await typeorm.connect()
	expect(async()=> await typeorm.save('',[])).rejects.toThrow(new DataBaseConnection())
	await typeorm.close()
})