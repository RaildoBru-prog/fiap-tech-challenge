import { ValueObject } from "./value-object";

export enum OrderStatusValue {
  Pending = "Pending",
  Received = "Received",
  Preparing = "Preparing",
  Ready = "Ready",
  Finished = "Finished",
}

export class OrderStatus extends ValueObject<OrderStatusValue> {}