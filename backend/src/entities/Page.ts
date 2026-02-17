import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pages')
export class Page {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    type!: string; // 'homepage', 'category', 'product_detail'

    @Column({ unique: true })
    slug!: string;

    @Column()
    title!: string;

    @Column({ type: 'jsonb' })
    content!: Record<string, any>;

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;

    @Column({ default: false })
    published!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
