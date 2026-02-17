import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ABTest } from './ABTest';
import { User } from './User';

@Entity('ab_test_assignments')
export class ABTestAssignment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'test_id' })
    testId!: string;

    @Column({ name: 'user_id', nullable: true })
    userId?: string;

    @Column({ name: 'session_id', nullable: true })
    sessionId?: string;

    @Column({ name: 'variant_key' })
    variantKey!: string;

    @CreateDateColumn({ name: 'assigned_at' })
    assignedAt!: Date;

    @ManyToOne(() => ABTest, test => test.assignments)
    @JoinColumn({ name: 'test_id' })
    test!: ABTest;

    @ManyToOne(() => User, user => user.abTestAssignments)
    @JoinColumn({ name: 'user_id' })
    user?: User;
}
