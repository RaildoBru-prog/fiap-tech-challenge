import { NotPersistedOrder, Order } from "src/entities/domain/order";

export abstract class OrderRepository {
  abstract create(order: NotPersistedOrder): Promise<Order>;
  abstract findAll(): Promise<Order[]>;
}