import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from './Order';
import { AnalyticsEvent } from './AnalyticsEvent';
import { ABTestAssignment } from './ABTestAssignment';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ name: 'password_hash' })
    passwordHash!: string;

    @Column({ name: 'first_name', nullable: true })
    firstName?: string;

    @Column({ name: 'last_name', nullable: true })
    lastName?: string;

    @Column({ default: 'customer' })
    role!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @OneToMany(() => Order, order => order.user)
    orders!: Order[];

    @OneToMany(() => AnalyticsEvent, event => event.user)
    analyticsEvents!: AnalyticsEvent[];

    @OneToMany(() => ABTestAssignment, assignment => assignment.user)
    abTestAssignments!: ABTestAssignment[];
}
