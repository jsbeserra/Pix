import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class Accounts1697843348465 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'bank',
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
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'url_for_transaction',
						type: 'varchar',
						length: '255',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'webhook_notification',
						type: 'varchar',
						length: '255',
						isUnique: true,
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
						name: 'cpf',
						type: 'varchar(11)',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
						isNullable: false,
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
						onUpdate: 'CURRENT_TIMESTAMP',
						isNullable: false,
					},
					{
						name: 'bank_id',
						type: 'uuid',
						isNullable: false,
					},
				],
			})
		)

    
		await queryRunner.createForeignKey(
			'account',
			new TableForeignKey({
				columnNames: ['bank_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'bank',
				onDelete: 'CASCADE',
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('account')
		await queryRunner.dropTable('bank')
	}

}
