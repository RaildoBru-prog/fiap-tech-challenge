import { NotFoundException } from '@nestjs/common';
import { OrderRepository } from 'src/repository/ports/order.repository';
import { CustomerRepository } from "src/repository/ports/customer.repository";
import { ProductRepository } from 'src/repository/ports/product.repository';
import { exit } from 'process';
import { OrderDto } from 'src/controllers/order/dtos/order.dto'; 
import { OrderStatusValue } from "src/entities/domain/value-objects/order-status";
import { NotPersistedOrder } from "src/entities/domain/order";
import * as _ from 'lodash';

export class OrderUseCases {
    constructor(private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private customerRepository: CustomerRepository
    ){}
    async createOrder(order) {
        const products = await this.productRepository.findByIDs(order.products.map(p => p.id));
        const indexedProducts = _.keyBy(products, 'id');
        const newOrder = new NotPersistedOrder({
            ...order,
            customer: order.customerId
                ? await this.customerRepository.findByID(order.customerId)
                : null,
            products: order.products.map(p => ({ ...p, ...indexedProducts[p.id] })),
            status: OrderStatusValue.Received,
            total: products.reduce((acc, p) => acc + p.price, 0),
        });
        const persistedOrder = await this.orderRepository.create(newOrder);
        return await new OrderDto(persistedOrder);
    }

    async findOrder(){
        const orders = await this.orderRepository.findAll();
        return orders.map(o => new OrderDto(o));
    }
}