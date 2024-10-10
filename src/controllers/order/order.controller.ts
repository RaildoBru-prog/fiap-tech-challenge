import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/repository/ports/order.repository";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { ProductRepository } from "src/repository/ports/product.repository";
import { CustomerRepository } from "src/repository/ports/customer.repository";
///import { OrderStatusValue } from "src/entities/domain/value-objects/order-status";
import  { OrderUseCases } from 'src/usecases/order'

@Injectable()
export class OrderController {
    constructor(
        private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private customerRepository: CustomerRepository
    ){}

    async createrOrder(order: CreateOrderDto){

        const orders = new OrderUseCases(this.orderRepository,this.productRepository, this.customerRepository)
        return await orders.createOrder(order);
    }

    async findAll() {
        const orders = new OrderUseCases(this.orderRepository, this.productRepository, this.customerRepository);        
        return await orders.findOrder();
    }

    async findSort() {
        const orders = new OrderUseCases(this.orderRepository, this.productRepository, this.customerRepository);
        return await orders.findOrderStatus();
    }
}