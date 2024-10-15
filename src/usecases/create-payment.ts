import { PaymentRepository } from 'src/repository/payment.repository';
import { Payment } from 'src/entities/payment';

export class CreatePaymentUseCase {
  constructor(
    private idOrder = idOrder,
    private amout = amout,
    private status = status
  ){}

  async execute(){
    const payment = new Payment(this.idOrder,this.amout, this.status);
    return payment;
  }
}