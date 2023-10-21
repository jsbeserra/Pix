import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Generated } from 'typeorm'
import { Bank } from './Bank' // Importe a entidade Bank se você tiver uma

@Entity()
export default class Account {
  @PrimaryGeneratedColumn('increment')
  	id: number

  @Column({ type: 'varchar', length: 11, unique: true, nullable: false })
  	cpf: string

  @Column({ type: 'varchar', length: 10, nullable: false })
  	pix_key: string

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  	created_at: Date

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  	updated_at: Date

  // @Column({ type: 'uuid', nullable: true })
  // 	bank_id: string

  // @OneToOne(() => Bank)
  // @JoinColumn({ name: 'bank_id' })
  // 	bank: Bank
}



