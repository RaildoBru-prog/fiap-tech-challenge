import { PaymentRepository } from 'src/repository/payment.repository';
import { Payment } from 'src/entities/payment';

export class CreatePaymentUseCase {
//   /constructor(private paymentRepository: PaymentRepository) {}

  async execute(amount: number, description: string): Promise<Payment> {
    const payment = new Payment('6666', amount, description, 'pending');
    return payment;
  }
}