import { ValueObject } from "./value-object";

export enum OrderStatusValue {
  Pending = "Pending",
  Received = "Received",
  Preparing = "Preparing",
  Ready = "Ready",
  Finished = "Finished",
  Refused = "Refused"
}

export class OrderStatus extends ValueObject<OrderStatusValue> {}