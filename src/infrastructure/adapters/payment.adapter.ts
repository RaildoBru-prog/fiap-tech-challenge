import { Post } from "@nestjs/common";
import axios from 'axios'


export class PaymentAdapter {
    constructor(private payment = payment){}
    createPayment(){
        const urlpayment = process.env.URL_PAYMENT
        return axios.post(
            urlpayment,{
            amount: this.payment.amount,
            orderId: this.payment.id,
            webhookUrl: process.env.URL_WEBHOOK,
            modalidadePagamento: "CartaoCredito",
            flagValidacaoPagamento: true
        });
    }
}
  