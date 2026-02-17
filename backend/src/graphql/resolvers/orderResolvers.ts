import { Context } from '../context';
import { Order } from '../../entities/Order';
import { OrderItem } from '../../entities/OrderItem';
import { ProductVariant } from '../../entities/ProductVariant';
import { Inventory } from '../../entities/Inventory';

export const orderResolvers = {
    Query: {
        orders: async (_: any, args: any, context: Context) => {
            const { userId, status, limit = 50, offset = 0 } = args;
            const repo = context.db.getRepository(Order);

            const query = repo.createQueryBuilder('order');

            if (userId) {
                query.where('order.userId = :userId', { userId });
            }

            if (status) {
                query.andWhere('order.status = :status', { status });
            }

            query.skip(offset).take(limit).orderBy('order.createdAt', 'DESC');

            return await query.getMany();
        },

        order: async (_: any, args: any, context: Context) => {
            const { id } = args;
            const repo = context.db.getRepository(Order);
            return await repo.findOne({ where: { id } });
        },
    },

    Mutation: {
        createOrder: async (_: any, args: any, context: Context) => {
            const { input } = args;
            const orderRepo = context.db.getRepository(Order);
            const itemRepo = context.db.getRepository(OrderItem);
            const variantRepo = context.db.getRepository(ProductVariant);
            const inventoryRepo = context.db.getRepository(Inventory);

            // Calculate totals
            let subtotal = 0;
            const itemsData = [];

            for (const item of input.items) {
                const variant = await variantRepo.findOne({ where: { id: item.variantId } });
                if (!variant) {
                    throw new Error(`Variant ${item.variantId} not found`);
                }

                // Check inventory
                const inventories = await inventoryRepo.find({ where: { variantId: item.variantId } });
                const available = inventories.reduce((sum, inv) => sum + (inv.quantity - inv.reservedQuantity), 0);

                if (available < item.quantity) {
                    throw new Error(`Insufficient inventory for variant ${variant.sku}`);
                }

                const totalPrice = variant.price * item.quantity;
                subtotal += totalPrice;

                itemsData.push({
                    variantId: item.variantId,
                    quantity: item.quantity,
                    unitPrice: variant.price,
                    totalPrice,
                });
            }

            // Calculate tax and shipping (simplified)
            const tax = subtotal * 0.08; // 8% tax
            const shipping = 10.00; // Flat rate
            const total = subtotal + tax + shipping;

            // Create order
            const order = orderRepo.create({
                userId: input.userId,
                status: 'pending',
                subtotal,
                tax,
                shipping,
                total,
                shippingAddress: input.shippingAddress,
                billingAddress: input.billingAddress || input.shippingAddress,
            });

            const savedOrder = await orderRepo.save(order);

            // Create order items
            for (const itemData of itemsData) {
                const orderItem = itemRepo.create({
                    orderId: savedOrder.id,
                    ...itemData,
                });
                await itemRepo.save(orderItem);

                // Reserve inventory
                const inventories = await inventoryRepo.find({ where: { variantId: itemData.variantId } });
                let remaining = itemData.quantity;

                for (const inv of inventories) {
                    const available = inv.quantity - inv.reservedQuantity;
                    if (available > 0) {
                        const toReserve = Math.min(available, remaining);
                        inv.reservedQuantity += toReserve;
                        await inventoryRepo.save(inv);
                        remaining -= toReserve;

                        if (remaining === 0) break;
                    }
                }
            }

            return savedOrder;
        },

        updateOrderStatus: async (_: any, args: any, context: Context) => {
            const { id, status } = args;
            const repo = context.db.getRepository(Order);

            await repo.update(id, { status });
            return await repo.findOne({ where: { id } });
        },
    },

    Order: {
        items: async (parent: Order, _: any, context: Context) => {
            const repo = context.db.getRepository(OrderItem);
            return await repo.find({ where: { orderId: parent.id } });
        },

        payments: async (parent: Order, _: any, context: Context) => {
            const { Payment } = await import('../../entities/Payment');
            const repo = context.db.getRepository(Payment);
            return await repo.find({ where: { orderId: parent.id } });
        },
    },

    OrderItem: {
        variant: async (parent: OrderItem, _: any, context: Context) => {
            const repo = context.db.getRepository(ProductVariant);
            return await repo.findOne({ where: { id: parent.variantId } });
        },
    },
};
