import { NotPersistedOrder, Order } from "src/entities/domain/order";

export abstract class OrderRepository {
  abstract create(order: NotPersistedOrder);
  abstract findAll(): Promise<Order[]>;
  abstract findSort(): Promise<Order[]>;
  abstract updateStatus(id: string, order);
  abstract paymentStatus(id: string)
}