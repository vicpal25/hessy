import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ProductVariant } from './ProductVariant';
import { Asset } from './Asset';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ unique: true })
    slug!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'base_price', type: 'decimal', precision: 10, scale: 2 })
    basePrice!: number;

    @Column({ nullable: true })
    category?: string;

    @Column({ default: 'active' })
    status!: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => ProductVariant, variant => variant.product)
    variants!: ProductVariant[];

    @ManyToMany(() => Asset)
    @JoinTable({
        name: 'product_assets',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'asset_id' }
    })
    assets!: Asset[];
}
