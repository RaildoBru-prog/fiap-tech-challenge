import { NotFoundException } from '@nestjs/common';
import { OrderRepository } from 'src/repository/ports/order.repository';
import { CustomerRepository } from "src/repository/ports/customer.repository";
import { ProductRepository } from 'src/repository/ports/product.repository';
import { OrderDto } from 'src/controllers/order/dtos/order.dto'; 
import { OrderStatus, OrderStatusValue } from "src/entities/domain/value-objects/order-status";
import { OrderStatusNumValue } from 'src/entities/domain/value-objects/order-status-num';
import { NotPersistedOrder, Order } from "src/entities/domain/order";
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
            status: OrderStatusValue.Pending,
            statusNum: 0,
            total: products.reduce((acc, p) => acc + p.price, 0),
        });

        const persistedOrder = await this.orderRepository.create(newOrder);
        return await new OrderDto(persistedOrder);
    }

    async findOrder(){
        const orders = await this.orderRepository.findAll();
        return orders.map(o => new OrderDto(o));
    }

    async findOrderStatus(){
        const orders = await this.orderRepository.findSort();
        return orders.map(o => new OrderDto(o));
    }

    async findPaymentStatus(id){
        const paymentStatus = await this.orderRepository.paymentStatus(id);
        const payment =  paymentStatus[0]["status"] === OrderStatusValue.Refused? paymentStatus[0]["status"]: "Approved";
        return {
            orderId: paymentStatus[0]["id"],
            Amout: paymentStatus[0]["total"],
            paymentStatus : payment
        }
    }

    async updateOrder(id, param){
        const ordeUpdate = {
            "status" : OrderStatusValue[param.status],
            "statusNum" : OrderStatusNumValue[param.status]
        };
        console.log(OrderStatusValue[param.status]);
        console.log(OrderStatusNumValue[param.status]);
        await this.orderRepository.updateStatus(id, ordeUpdate);
        return await this.findOrderStatus();
    }

    async updatePayment(id, param){
        console.log("=============");
        console.log(param.status);
        const ordePay = {
            "status" : OrderStatusValue[param.status],
            "statusNum" : OrderStatusNumValue[param.status]
        };
        console.log(param);

        return this.orderRepository.updateStatus(id, ordePay);
    }
}
