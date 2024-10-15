import { ValueObject } from "./value-object";

export enum OrderStatusNumValue {
  Pending = 0,
  Received = 1,
  Preparing = 2,
  Ready = 3,
  Finished = 4,
  Refused = 5
}

export class OrderStatusNum extends ValueObject<OrderStatusNumValue> {}