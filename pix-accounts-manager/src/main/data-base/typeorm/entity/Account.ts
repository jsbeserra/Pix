import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm'
import { Bank } from './Bank'

@Entity()
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  	id: number

  @Column({ type: 'varchar', length: 11, unique: true, nullable: false })
  	cpf: string

  @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
  	pix_key: string

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  	created_at: Date

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  	updated_at: Date

  @Column({ nullable: true })
  	bank_id: number

  @ManyToOne(() => Bank, bank => bank.accounts)
  @JoinColumn({ name: 'bank_id' })
  	bank: Bank
}