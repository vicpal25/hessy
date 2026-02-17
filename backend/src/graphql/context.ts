import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export interface Context {
    req: Request;
    res: Response;
    db: typeof AppDataSource;
    redis: Redis;
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export async function createContext({ req, res }: { req: Request; res: Response }): Promise<Context> {
    const context: Context = {
        req,
        res,
        db: AppDataSource,
        redis,
    };

    // Extract JWT token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // const token = authHeader.substring(7);
        try {
            // TODO: Verify JWT and extract user info
            // For now, we'll implement this in the auth service
            // const decoded = verifyToken(token);
            // context.user = decoded;
        } catch (error) {
            // Invalid token, continue without user
        }
    }

    return context;
}
