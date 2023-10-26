import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

@Entity()
export default class Account extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id: string

	@Column({ type: 'varchar', length: 11, unique: true, nullable: false }) cpf: string

	@Column({ type: 'varchar', length: 255, nullable: false }) name: string

	@Column({ type: 'varchar', length: 255, nullable: false }) mother_name: string

	@Column({ type: 'timestamp', nullable: false }) date_of_birth: string

	@Column({ type: 'decimal', nullable: false }) balance: number

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) opening_date: Date

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) updated_at: Date
	
	@Column({ type: 'boolean', nullable: false, default:true }) active: boolean
}