import { Context } from '../context';
import { AnalyticsEvent } from '../../entities/AnalyticsEvent';

export const analyticsResolvers = {
    Query: {
        analyticsEvents: async (_: any, args: any, context: Context) => {
            const { eventType, userId, startDate, endDate } = args;
            const repo = context.db.getRepository(AnalyticsEvent);

            const query = repo.createQueryBuilder('event');

            if (eventType) {
                query.where('event.eventType = :eventType', { eventType });
            }

            if (userId) {
                query.andWhere('event.userId = :userId', { userId });
            }

            if (startDate && endDate) {
                query.andWhere('event.createdAt BETWEEN :startDate AND :endDate', {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                });
            }

            query.orderBy('event.createdAt', 'DESC').take(1000);

            return await query.getMany();
        },

        analyticsReport: async (_: any, args: any, context: Context) => {
            const { eventType, groupBy, startDate, endDate } = args;
            const repo = context.db.getRepository(AnalyticsEvent);

            const query = repo.createQueryBuilder('event');

            if (eventType) {
                query.where('event.eventType = :eventType', { eventType });
            }

            if (startDate && endDate) {
                query.andWhere('event.createdAt BETWEEN :startDate AND :endDate', {
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                });
            }

            if (groupBy === 'day') {
                query
                    .select("DATE(event.createdAt)", 'date')
                    .addSelect('COUNT(*)', 'count')
                    .groupBy('date')
                    .orderBy('date', 'DESC');
            } else if (groupBy === 'eventType') {
                query
                    .select('event.eventType', 'eventType')
                    .addSelect('COUNT(*)', 'count')
                    .groupBy('event.eventType')
                    .orderBy('count', 'DESC');
            }

            const results = await query.getRawMany();
            return results;
        },
    },

    Mutation: {
        trackEvent: async (_: any, args: any, context: Context) => {
            const { input } = args;
            const repo = context.db.getRepository(AnalyticsEvent);

            const event = repo.create(input);
            return await repo.save(event);
        },
    },
};
