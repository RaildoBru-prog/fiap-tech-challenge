import { ValueObject } from "./value-object";

export enum OrderStatusNumValue {
  Received = 1,
  Preparing = 2,
  Ready = 3,
  Finished = 4,
}

export class OrderStatusNum extends ValueObject<OrderStatusNumValue> {}