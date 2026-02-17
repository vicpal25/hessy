import { Context } from '../context';
import { ABTest } from '../../entities/ABTest';
import { ABTestAssignment } from '../../entities/ABTestAssignment';

export const abTestResolvers = {
    Query: {
        abTests: async (_: any, args: any, context: Context) => {
            const { status } = args;
            const repo = context.db.getRepository(ABTest);

            if (status) {
                return await repo.find({ where: { status } });
            }

            return await repo.find();
        },

        abTest: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(ABTest);
            return await repo.findOne({ where: { id } });
        },

        getVariant: async (_: any, args: any, context: Context) => {
            const { testId, userId, sessionId } = args;
            const testRepo = context.db.getRepository(ABTest);
            const assignmentRepo = context.db.getRepository(ABTestAssignment);

            const test = await testRepo.findOne({ where: { id: testId } });
            if (!test || test.status !== 'active') {
                return null;
            }

            // Check for existing assignment
            let assignment = await assignmentRepo.findOne({
                where: userId ? { testId, userId } : { testId, sessionId },
            });

            if (!assignment) {
                // Create new assignment
                const variantKeys = Object.keys(test.variants);
                const randomKey = variantKeys[Math.floor(Math.random() * variantKeys.length)];

                assignment = assignmentRepo.create({
                    testId,
                    userId,
                    sessionId,
                    variantKey: randomKey,
                });

                await assignmentRepo.save(assignment);
            }

            return {
                variantKey: assignment.variantKey,
                variant: test.variants[assignment.variantKey],
            };
        },
    },

    Mutation: {
        createABTest: async (_: any, args: any, context: Context) => {
            const repo = context.db.getRepository(ABTest);
            const test = repo.create(args.input);
            return await repo.save(test);
        },

        updateABTest: async (_: any, args: any, context: Context) => {
            const { id, input } = args;
            const repo = context.db.getRepository(ABTest);

            await repo.update(id, input);
            return await repo.findOne({ where: { id } });
        },

        startABTest: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(ABTest);

            await repo.update(id, { status: 'active', startDate: new Date() });
            return await repo.findOne({ where: { id } });
        },

        stopABTest: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(ABTest);

            await repo.update(id, { status: 'completed', endDate: new Date() });
            return await repo.findOne({ where: { id } });
        },
    },
};
