import { Context } from '../context';
import { Payment } from '../../entities/Payment';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});

export const paymentResolvers = {
    Mutation: {
        createPaymentIntent: async (_: any, args: any, context: Context) => {
            const { orderId, gateway } = args;
            const { Order } = await import('../../entities/Order');
            const orderRepo = context.db.getRepository(Order);
            const paymentRepo = context.db.getRepository(Payment);

            const order = await orderRepo.findOne({ where: { id: orderId } });
            if (!order) {
                throw new Error('Order not found');
            }

            if (gateway === 'stripe') {
                // Create Stripe payment intent
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(order.total * 100), // Convert to cents
                    currency: 'usd',
                    metadata: {
                        orderId: order.id,
                    },
                });

                // Create payment record
                const payment = paymentRepo.create({
                    orderId: order.id,
                    gateway: 'stripe',
                    amount: order.total,
                    currency: 'USD',
                    status: 'pending',
                    metadata: {
                        paymentIntentId: paymentIntent.id,
                    },
                });

                const savedPayment = await paymentRepo.save(payment);

                return {
                    clientSecret: paymentIntent.client_secret,
                    paymentId: savedPayment.id,
                };
            }

            throw new Error(`Unsupported payment gateway: ${gateway}`);
        },

        confirmPayment: async (_: any, args: any, context: Context) => {
            const { paymentId, gatewayTransactionId } = args;
            const repo = context.db.getRepository(Payment);

            const payment = await repo.findOne({ where: { id: paymentId } });
            if (!payment) {
                throw new Error('Payment not found');
            }

            payment.gatewayTransactionId = gatewayTransactionId;
            payment.status = 'completed';

            return await repo.save(payment);
        },
    },
};
