import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Transaction1697843348465 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'transaction',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'code',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'receiver_pix_key',
						type: 'varchar',
						length: '10',
						isNullable: false,
					},
					{
						name: 'payer_pix_key',
						type: 'varchar',
						length: '10',
						isNullable: false,
					},
					{
						name: 'value',
						type: 'decimal',
						isNullable: false,
					},
					{
						name: 'created_at',
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
		await queryRunner.dropTable('transaction')
	}

}
