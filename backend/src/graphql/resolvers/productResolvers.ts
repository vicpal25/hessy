import { Context } from '../context';
import { Product } from '../../entities/Product';
import { ProductVariant } from '../../entities/ProductVariant';
import { Inventory } from '../../entities/Inventory';

export const productResolvers = {
    Query: {
        products: async (_: any, args: any, context: Context) => {
            const { category, status, limit = 50, offset = 0 } = args;
            const repo = context.db.getRepository(Product);

            const query = repo.createQueryBuilder('product');

            if (category) {
                query.where('product.category = :category', { category });
            }

            if (status) {
                query.andWhere('product.status = :status', { status });
            }

            query.skip(offset).take(limit);

            return await query.getMany();
        },

        product: async (_: any, args: any, context: Context) => {
            const { id, slug } = args;
            const repo = context.db.getRepository(Product);

            if (id) {
                return await repo.findOne({ where: { id } });
            }

            if (slug) {
                return await repo.findOne({ where: { slug } });
            }

            return null;
        },

        inventory: async (_: any, args: any, context: Context) => {
            const { variantId } = args;
            const repo = context.db.getRepository(Inventory);

            return await repo.find({ where: { variantId } });
        },

        checkAvailability: async (_: any, args: any, context: Context) => {
            const { variantId, quantity } = args;
            const repo = context.db.getRepository(Inventory);

            const inventories = await repo.find({ where: { variantId } });
            const totalAvailable = inventories.reduce(
                (sum, inv) => sum + (inv.quantity - inv.reservedQuantity),
                0
            );

            return totalAvailable >= quantity;
        },
    },

    Mutation: {
        createProduct: async (_: any, args: any, context: Context) => {
            const repo = context.db.getRepository(Product);
            const product = repo.create(args.input);
            return await repo.save(product);
        },

        updateProduct: async (_: any, args: any, context: Context) => {
            const { id, input } = args;
            const repo = context.db.getRepository(Product);

            await repo.update(id, input);
            return await repo.findOne({ where: { id } });
        },

        deleteProduct: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(Product);

            const result = await repo.delete(id);
            return result.affected ? result.affected > 0 : false;
        },

        updateInventory: async (_: any, args: any, context: Context) => {
            const { variantId, warehouseLocation, quantity } = args;
            const repo = context.db.getRepository(Inventory);

            let inventory = await repo.findOne({
                where: { variantId, warehouseLocation: warehouseLocation || '' }
            });

            if (!inventory) {
                inventory = repo.create({ variantId, warehouseLocation, quantity });
            } else {
                inventory.quantity = quantity;
            }

            return await repo.save(inventory);
        },

        reserveInventory: async (_: any, args: any, context: Context) => {
            const { variantId, quantity } = args;
            const repo = context.db.getRepository(Inventory);

            const inventories = await repo.find({ where: { variantId } });
            let remaining = quantity;

            for (const inv of inventories) {
                const available = inv.quantity - inv.reservedQuantity;
                if (available > 0) {
                    const toReserve = Math.min(available, remaining);
                    inv.reservedQuantity += toReserve;
                    await repo.save(inv);
                    remaining -= toReserve;

                    if (remaining === 0) break;
                }
            }

            return remaining === 0;
        },

        releaseInventory: async (_: any, args: any, context: Context) => {
            const { variantId, quantity } = args;
            const repo = context.db.getRepository(Inventory);

            const inventories = await repo.find({ where: { variantId } });
            let remaining = quantity;

            for (const inv of inventories) {
                if (inv.reservedQuantity > 0) {
                    const toRelease = Math.min(inv.reservedQuantity, remaining);
                    inv.reservedQuantity -= toRelease;
                    await repo.save(inv);
                    remaining -= toRelease;

                    if (remaining === 0) break;
                }
            }

            return true;
        },
    },

    Product: {
        variants: async (parent: Product, _: any, context: Context) => {
            const repo = context.db.getRepository(ProductVariant);
            return await repo.find({ where: { productId: parent.id } });
        },

        assets: async (parent: Product, _: any, context: Context) => {
            const repo = context.db.getRepository(Product);
            const product = await repo.findOne({
                where: { id: parent.id },
                relations: ['assets']
            });
            return product?.assets || [];
        },
    },

    ProductVariant: {
        product: async (parent: ProductVariant, _: any, context: Context) => {
            const repo = context.db.getRepository(Product);
            return await repo.findOne({ where: { id: parent.productId } });
        },

        inventory: async (parent: ProductVariant, _: any, context: Context) => {
            const repo = context.db.getRepository(Inventory);
            return await repo.find({ where: { variantId: parent.id } });
        },
    },
};
