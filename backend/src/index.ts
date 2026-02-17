import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppDataSource } from './database/data-source';
import { createContext } from './graphql/context';
import { resolvers } from './graphql/resolvers';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 4000;

async function startServer() {
    try {
        // Initialize database connection
        logger.info('Connecting to database...');
        await AppDataSource.initialize();
        logger.info('Database connected successfully');

        // Load GraphQL schema
        const typeDefs = readFileSync(
            join(__dirname, 'graphql', 'schema.graphql'),
            'utf-8'
        );

        // Create Apollo Server
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            formatError: (error) => {
                logger.error('GraphQL Error:', error);
                return error;
            },
        });

        await server.start();
        logger.info('Apollo Server started');

        // Create Express app
        const app = express();

        // Middleware
        app.use(cors());
        app.use(express.json());

        // Health check endpoint
        app.get('/health', (_req, res) => {
            res.json({ status: 'ok', timestamp: new Date().toISOString() });
        });

        // GraphQL endpoint
        app.use(
            '/graphql',
            expressMiddleware(server, {
                context: createContext,
            })
        );

        // Static file serving for uploads
        app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

        // Start server
        app.listen(PORT, () => {
            logger.info(`🚀 Server ready at http://localhost:${PORT}/graphql`);
            logger.info(`📊 Health check at http://localhost:${PORT}/health`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
