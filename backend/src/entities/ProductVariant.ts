import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Product } from './Product';
import { Inventory } from './Inventory';
import { OrderItem } from './OrderItem';

@Entity('product_variants')
export class ProductVariant {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'product_id' })
    productId!: string;

    @Column({ unique: true })
    sku!: string;

    @Column()
    name!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column({ type: 'jsonb', nullable: true })
    attributes?: Record<string, any>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => Product, product => product.variants)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @OneToMany(() => Inventory, inventory => inventory.variant)
    inventory!: Inventory[];

    @OneToMany(() => OrderItem, orderItem => orderItem.variant)
    orderItems!: OrderItem[];
}
