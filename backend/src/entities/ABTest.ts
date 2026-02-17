import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ABTestAssignment } from './ABTestAssignment';

@Entity('ab_tests')
export class ABTest {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'jsonb' })
    variants!: Record<string, any>; // { "control": {...}, "variant_a": {...} }

    @Column({ default: 'draft' })
    status!: string; // 'draft', 'active', 'paused', 'completed'

    @Column({ name: 'start_date', nullable: true })
    startDate?: Date;

    @Column({ name: 'end_date', nullable: true })
    endDate?: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => ABTestAssignment, assignment => assignment.test)
    assignments!: ABTestAssignment[];
}
