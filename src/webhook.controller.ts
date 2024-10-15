import { Controller, Post, Body, Headers, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { OrderUseCases } from 'src/usecases/order'
import { OrderRepository } from "src/repository/ports/order.repository";
import { ProductRepository } from "src/repository/ports/product.repository";
import { CustomerRepository } from "src/repository/ports/customer.repository";
import { OrderController } from './controllers/order/order.controller'; 
import { delay } from 'lodash';
import axios from 'axios';
@Controller('webhook')
export class WebhookController {
    private orderRepository : OrderRepository
    private productRepository : ProductRepository
    private customerRepository : CustomerRepository
  @Post()
  async handleWebhook(
    @Body() body: any,
    @Res() res: Response
  ) {
    this.sleep(5000);

       //const eventType = await body.type; // Exemplo de um tipo de evento enviado
        if (body['Status'] === 'Accepted') {
            const paymentId = body["OrderId"];
            const paymentStatus = body["Status"];
            console.log(`Pagamento ${paymentId} atualizado para ${paymentStatus}`);

            const params = {
                "status" : "Received"
            };
            const url  = "http://localhost:3000/order/" + paymentId
            axios.put(url,{
                "status" : "Received"
            });
            res.status(200).send({ message: 'Webhook recebido com sucesso' });
        }
    }
    sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
  

}