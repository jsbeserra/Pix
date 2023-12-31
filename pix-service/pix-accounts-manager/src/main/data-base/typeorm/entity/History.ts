import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	BaseEntity,
} from 'typeorm'

@Entity()
export default class HistoryAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') idx: string

  @Column({ type: 'varchar', length: 11, nullable: false }) cpf: string

  @Column({ type: 'varchar', length: 10, nullable: false }) pix_key: string

  @Column({ type: 'timestamp', nullable: false }) created_at: Date

  @CreateDateColumn({ type: 'timestamp', nullable: false}) removed_at: Date

  @Column({ type: 'varchar', length: 255, nullable: false }) bank_name: string

  @Column({ type: 'varchar', length: 255, nullable: false }) bank_url_for_transaction: string

  @Column({ type: 'varchar', length: 255, nullable: false }) bank_url_for_refund: string
}
