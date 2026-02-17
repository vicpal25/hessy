import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';
import { Payment } from './Payment';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'user_id', nullable: true })
    userId?: string;

    @Column({ default: 'pending' })
    status!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    tax!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    shipping!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total!: number;

    @Column({ name: 'shipping_address', type: 'jsonb', nullable: true })
    shippingAddress?: Record<string, any>;

    @Column({ name: 'billing_address', type: 'jsonb', nullable: true })
    billingAddress?: Record<string, any>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @OneToMany(() => OrderItem, item => item.order)
    items!: OrderItem[];

    @OneToMany(() => Payment, payment => payment.order)
    payments!: Payment[];
}
