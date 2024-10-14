import { PaymentRepository } from 'src/repository/payment.repository';

export class WebhookPaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(paymentId: string, status: string): Promise<void> {
    await this.paymentRepository.updatePaymentStatus(paymentId, status);
  }
}
