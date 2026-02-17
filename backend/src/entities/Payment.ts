import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'order_id' })
    orderId!: string;

    @Column()
    gateway!: string;

    @Column({ name: 'gateway_transaction_id', nullable: true })
    gatewayTransactionId?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount!: number;

    @Column({ default: 'USD' })
    currency!: string;

    @Column({ default: 'pending' })
    status!: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => Order, order => order.payments)
    @JoinColumn({ name: 'order_id' })
    order!: Order;
}
