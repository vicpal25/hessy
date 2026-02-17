import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false, // Use migrations in production
    logging: process.env.NODE_ENV === 'development',
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
});
