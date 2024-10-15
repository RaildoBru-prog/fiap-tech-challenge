import { ValueObject } from "./value-object";

export enum OrderpaymentStatusValue {
    Waiting = 1,
    Approved = 2,
    Failed = 3,
}

export class OrderpaymentStatus extends ValueObject<OrderpaymentStatusValue> {}