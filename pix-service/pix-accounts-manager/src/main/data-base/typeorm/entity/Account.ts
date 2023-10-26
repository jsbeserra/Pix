import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	BaseEntity,
	OneToMany,
} from 'typeorm'
import PixKey from './PixKey'
import { Bank } from './Bank'
  
  @Entity()
export default class Account extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id: string
  
	@Column({ type: 'varchar', length: 11, unique: true, nullable: false }) cpf: string
  
	@OneToMany(() => PixKey, (pixKey) => pixKey.account)pixKeys: PixKey[]
  
	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) created_at: Date
  
	@UpdateDateColumn({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP',}) updated_at: Date
  
	@Column({ nullable: true, type: 'uuid', unique: false }) bank_id: string

	@ManyToOne(() => Bank, (bank) => bank.accounts)
	@JoinColumn({ name: 'bank_id' }) bank: Bank
}
  