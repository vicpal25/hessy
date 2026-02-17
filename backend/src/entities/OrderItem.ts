import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { ProductVariant } from './ProductVariant';

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'order_id' })
    orderId!: string;

    @Column({ name: 'variant_id' })
    variantId!: string;

    @Column()
    quantity!: number;

    @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
    unitPrice!: number;

    @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
    totalPrice!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: 'order_id' })
    order!: Order;

    @ManyToOne(() => ProductVariant, variant => variant.orderItems)
    @JoinColumn({ name: 'variant_id' })
    variant!: ProductVariant;
}
