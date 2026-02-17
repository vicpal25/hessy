import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductVariant } from './ProductVariant';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'variant_id' })
    variantId!: string;

    @Column({ name: 'warehouse_location', nullable: true })
    warehouseLocation?: string;

    @Column({ default: 0 })
    quantity!: number;

    @Column({ name: 'reserved_quantity', default: 0 })
    reservedQuantity!: number;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @ManyToOne(() => ProductVariant, variant => variant.inventory)
    @JoinColumn({ name: 'variant_id' })
    variant!: ProductVariant;

    get availableQuantity(): number {
        return this.quantity - this.reservedQuantity;
    }
}
