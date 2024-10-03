import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/application/ports/order.repository";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { NotPersistedOrder } from "src/entities/domain/order";
import { ProductRepository } from "src/application/ports/product.repository";
import { OrderDto } from "./dtos/order.dto";
import { CustomerRepository } from "src/application/ports/customer.repository";
import { OrderStatusValue } from "src/entities/domain/value-objects/order-status";
import * as _ from 'lodash';

@Injectable()
export class OrderController {
    constructor(
        private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private customerRepository: CustomerRepository
    ){}

    async createrOrder(order: CreateOrderDto){
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
        return new OrderDto(persistedOrder);
    }

    async findAll() {
        const orders = await this.orderRepository.findAll();
        return orders.map(o => new OrderDto(o));
    }
}