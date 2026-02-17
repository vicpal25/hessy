import { productResolvers } from './productResolvers';
import { orderResolvers } from './orderResolvers';
import { paymentResolvers } from './paymentResolvers';
import { pageResolvers } from './pageResolvers';
import { analyticsResolvers } from './analyticsResolvers';
import { abTestResolvers } from './abTestResolvers';
import { authResolvers } from './authResolvers';
import { GraphQLScalarType, Kind } from 'graphql';

// JSON scalar type
const JSONScalar = new GraphQLScalarType({
    name: 'JSON',
    description: 'JSON custom scalar type',
    serialize(value: any) {
        return value;
    },
    parseValue(value: any) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.OBJECT || ast.kind === Kind.LIST) {
            return JSON.parse(JSON.stringify(ast));
        }
        return null;
    },
});

export const resolvers = {
    JSON: JSONScalar,
    Query: {
        ...productResolvers.Query,
        ...orderResolvers.Query,
        ...pageResolvers.Query,
        ...analyticsResolvers.Query,
        ...abTestResolvers.Query,
        ...authResolvers.Query,
    },
    Mutation: {
        ...productResolvers.Mutation,
        ...orderResolvers.Mutation,
        ...paymentResolvers.Mutation,
        ...pageResolvers.Mutation,
        ...analyticsResolvers.Mutation,
        ...abTestResolvers.Mutation,
        ...authResolvers.Mutation,
    },
    Product: productResolvers.Product,
    ProductVariant: productResolvers.ProductVariant,
    Order: orderResolvers.Order,
    OrderItem: orderResolvers.OrderItem,
};
