import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { OrderRepository } from "src/repository/ports/order.repository";
import { ProductRepository } from "src/repository/ports/product.repository";
import { CustomerRepository } from "src/repository/ports/customer.repository";
import { OrderUseCases } from 'src/usecases/order'
import { CreatePaymentUseCase } from "@usecases/create-payment";
import { PaymentAdapter } from "src/infrastructure/adapters/payment.adapter";

@Injectable()
export class OrderController {
    constructor(
        private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private customerRepository: CustomerRepository
    ){}

    async createrOrder(order: CreateOrderDto){
        const orders = new OrderUseCases(this.orderRepository,this.productRepository, this.customerRepository)
        const createPayment = await orders.createOrder(order);        
        const payment = new CreatePaymentUseCase(
            createPayment['id'],
            createPayment['total'],
            createPayment['status']
        );
        const pay = await payment.execute();

        const paymentAdapter = await new PaymentAdapter(pay).createPayment();

        return await paymentAdapter['data'];
    }

    async findAll() {
        const orders = new OrderUseCases(this.orderRepository, this.productRepository, this.customerRepository);        
        return await orders.findOrder();
    }

    async findSort() {
        const orders = new OrderUseCases(this.orderRepository, this.productRepository, this.customerRepository);
        return await orders.findOrderStatus();
    }

    async updateOrder(id, status){
        const updateOrders = new OrderUseCases(this.orderRepository, this.productRepository, this.customerRepository);
        return await updateOrders.updateOrder(id, status);
    }

    async paymentStatus(id){
        const orderpaymentStatus = new OrderUseCases(this.orderRepository, this.productRepository, this.customerRepository);
        return await orderpaymentStatus.findPaymentStatus(id);
    }
}
