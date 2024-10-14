import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/repository/ports/order.repository";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { ProductRepository } from "src/repository/ports/product.repository";
import { CustomerRepository } from "src/repository/ports/customer.repository";
import { OrderUseCases } from 'src/usecases/order'
import { CreatePaymentUseCase } from "@usecases/create-payment";
import { MercadoPagoAdapter } from "src/infrastructure/adapters/mercado-pago.adapter";


@Injectable()
export class OrderController {
    constructor(
        private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private customerRepository: CustomerRepository
    ){}

    async createrOrder(order: CreateOrderDto){
 
        const pagamento = false;

        const payment = new CreatePaymentUseCase();
        const teste = await payment.execute(
            20,
            'teste'
        );
        const mercadoPago = new  MercadoPagoAdapter();

        const paymentUrl = await mercadoPago.createPayment(
            20,
            'teste'
        );
        console.log(paymentUrl);

        if(pagamento){
            const orders = new OrderUseCases(this.orderRepository,this.productRepository, this.customerRepository)
            return await orders.createOrder(order);
        }

        return 'erro';
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

    async updateOrder(id, status){
        const updateOrders = new OrderUseCases(this.orderRepository, this.productRepository, this.customerRepository);
        return await updateOrders.updateOrder(id, status);
    }
}

/**
 * import { Controller, Post, Body } from '@nestjs/common';
import { CreatePaymentUseCase } from 'src/application/use-cases/create-payment.usecase';
import { MercadoPagoAdapter } from '../adapters/mercado-pago.adapter';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly mercadoPagoAdapter: MercadoPagoAdapter
  ) {}

  @Post()
  async createPayment(@Body() body: { amount: number; description: string }) {
    const payment = await this.createPaymentUseCase.execute(
      body.amount,
      body.description
    );

    const paymentUrl = await this.mercadoPagoAdapter.createPayment(
      payment.amount,
      payment.description
    );

    return { paymentUrl };
  }
}
 */