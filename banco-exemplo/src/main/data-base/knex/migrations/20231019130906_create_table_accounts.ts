import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('accounts', function (table) {
		table.increments('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
		table.string('cpf', 11).notNullable().unique()
		table.string('name', 255).notNullable()
		table.string('mother_name', 255).notNullable()
		table.timestamp('date_of_birth', { useTz: true }).notNullable()
		table.decimal('balance').notNullable()
		table.timestamp('opening_date', { useTz: true }).notNullable() 
		table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now())
		table.boolean('active').notNullable()
		table.string('pix_key', 10)
	})
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTable('accounts')
}
