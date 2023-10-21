import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Bank {
  @PrimaryGeneratedColumn('increment')
  	id: number

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  	name: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  	url_for_transaction: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  	webhook_notification: string

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  	created_at: Date

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  	updated_at: Date
}