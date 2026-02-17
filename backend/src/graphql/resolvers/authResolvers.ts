import { Context } from '../context';
import { User } from '../../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authResolvers = {
    Query: {
        me: async (_: any, __: any, context: Context) => {
            if (!context.user) {
                throw new Error('Not authenticated');
            }

            const repo = context.db.getRepository(User);
            return await repo.findOne({ where: { id: context.user.id } });
        },

        user: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(User);
            return await repo.findOne({ where: { id } });
        },
    },

    Mutation: {
        register: async (_: any, args: any, context: Context) => {
            const { email, password, firstName, lastName } = args;
            const repo = context.db.getRepository(User);

            // Check if user exists
            const existing = await repo.findOne({ where: { email } });
            if (existing) {
                throw new Error('User already exists');
            }

            // Hash password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create user
            const user = repo.create({
                email,
                passwordHash,
                firstName,
                lastName,
                role: 'customer',
            });

            const savedUser = await repo.save(user);

            // Generate token
            const token = jwt.sign(
                { id: savedUser.id, email: savedUser.email, role: savedUser.role },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            return { token, user: savedUser };
        },

        login: async (_: any, args: any, context: Context) => {
            const { email, password } = args;
            const repo = context.db.getRepository(User);

            // Find user
            const user = await repo.findOne({ where: { email } });
            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Verify password
            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) {
                throw new Error('Invalid credentials');
            }

            // Generate token
            const token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '7d' }
            );

            return { token, user };
        },
    },
};
