import { Context } from '../context';
import { Page } from '../../entities/Page';

export const pageResolvers = {
    Query: {
        pages: async (_: any, args: any, context: Context) => {
            const { type, published } = args;
            const repo = context.db.getRepository(Page);

            const query = repo.createQueryBuilder('page');

            if (type) {
                query.where('page.type = :type', { type });
            }

            if (published !== undefined) {
                query.andWhere('page.published = :published', { published });
            }

            return await query.getMany();
        },

        page: async (_: any, args: any, context: Context) => {
            const { id, slug } = args;
            const repo = context.db.getRepository(Page);

            if (id) {
                return await repo.findOne({ where: { id } });
            }

            if (slug) {
                return await repo.findOne({ where: { slug } });
            }

            return null;
        },
    },

    Mutation: {
        createPage: async (_: any, args: any, context: Context) => {
            const repo = context.db.getRepository(Page);
            const page = repo.create(args.input);
            return await repo.save(page);
        },

        updatePage: async (_: any, args: any, context: Context) => {
            const { id, input } = args;
            const repo = context.db.getRepository(Page);

            await repo.update(id, input);
            return await repo.findOne({ where: { id } });
        },

        deletePage: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(Page);

            const result = await repo.delete(id);
            return result.affected ? result.affected > 0 : false;
        },

        publishPage: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(Page);

            await repo.update(id, { published: true });
            return await repo.findOne({ where: { id } });
        },
    },
};
