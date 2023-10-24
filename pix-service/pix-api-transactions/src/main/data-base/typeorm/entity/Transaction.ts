import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

@Entity()
export default class Transaction extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id: string

	@Column({ type: 'varchar', length: 255, nullable: false }) code: string

	@Column({ type: 'varchar', length: 10, nullable: false }) receiver_pix_key: string

	@Column({ type: 'varchar', length: 10, nullable: false }) payer_pix_key: string

	@Column({ type: 'decimal', nullable: false }) value: number

	@Column({ type: 'varchar', length: 10, nullable: false }) status: string

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) created_at: Date

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) updated_at: Date

}