import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'
import Account from './Account'
  
  @Entity()
export default class PixKey {
    @PrimaryGeneratedColumn('uuid')id: string
  
    @Column({ type: 'varchar', length: 10, unique: true, nullable: false }) pix_key: string
  
    @Column({ type: 'uuid' })account_id: string
  
    @ManyToOne(() => Account, (account) => account.pixKeys)
    @JoinColumn({ name: 'account_id' })account: Account
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) created_at: Date
  
    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',onUpdate: 'CURRENT_TIMESTAMP'}) updated_at: Date
}