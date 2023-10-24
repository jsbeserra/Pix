import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateHistoryAccountTable1629645484567 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'history_account',
			columns: [
				{ name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
				{ name: 'cpf', type: 'varchar', length: '11', isNullable: false },
				{ name: 'pix_key', type: 'varchar', length: '10', isNullable: false },
				{ name: 'created_at', type: 'timestamp', isNullable: false },
				{ name: 'removed_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
				{ name: 'bank_name', type: 'varchar', length: '255', isNullable: false },
				{ name: 'bank_url_for_transaction', type: 'varchar', length: '255', isNullable: false },
				{ name: 'bank_webhook_notification', type: 'varchar', length: '255', isNullable: false },
			],
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('history_account')
	}
}
