import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity('analytics_events')
export class AnalyticsEvent {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'event_type' })
    eventType!: string;

    @Column({ name: 'user_id', nullable: true })
    userId?: string;

    @Column({ name: 'session_id', nullable: true })
    sessionId?: string;

    @Column({ type: 'jsonb', nullable: true })
    properties?: Record<string, any>;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne(() => User, user => user.analyticsEvents)
    @JoinColumn({ name: 'user_id' })
    user?: User;
}
