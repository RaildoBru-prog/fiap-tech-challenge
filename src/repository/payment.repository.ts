import { Payment } from '../entities/payment';

export interface PaymentRepository {
  createPayment(payment: Payment): Promise<Payment>;
  updatePaymentStatus(id: string, status: string): Promise<void>;
}