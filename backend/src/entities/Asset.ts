import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('assets')
export class Asset {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    filename!: string;

    @Column({ name: 'original_filename' })
    originalFilename!: string;

    @Column({ name: 'mime_type' })
    mimeType!: string;

    @Column({ name: 'size_bytes' })
    sizeBytes!: number;

    @Column({ type: 'text' })
    url!: string;

    @Column({ name: 'alt_text', nullable: true })
    altText?: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata?: Record<string, any>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
