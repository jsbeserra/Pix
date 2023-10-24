import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Accounts1697843348465 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'account',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'name',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'pix_key',
						type: 'varchar',
						length: '10',
						isUnique: true
					},
					{
						name: 'cpf',
						type: 'varchar',
						length: '11',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'mother_name',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'date_of_birth',
						type: 'timestamp',
						isNullable: false,
					},
					{
						name: 'balance',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'active',
						type: 'boolean',
						isNullable: false,
						default: true
					},
					{
						name: 'opening_date',
						type: 'timestamp',
						isNullable: false,
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						isNullable: false,
						default: 'CURRENT_TIMESTAMP',
					},
				],
			})
		)
		
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('account')
	}

}
