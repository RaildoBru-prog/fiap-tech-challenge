import { Customer } from "./customer";
import { Entity, NotPersistedEntity, PersistedEntity } from "./entity";
import { OrderpaymentStatus, OrderpaymentStatusValue } from "./value-objects/order-payment-status";
import { OrderStatus, OrderStatusValue } from "./value-objects/order-status";
import { OrderStatusNum, OrderStatusNumValue } from "./value-objects/order-status-num";
import { ProductCategory } from "./value-objects/product-category";

type OrderProduct = {
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  quantity: number;
}

class _Order<T extends PersistedEntity | NotPersistedEntity = PersistedEntity> extends Entity<T> {
  customer: Customer | null;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  statusNum: number;
  //paymentStatus: OrderpaymentStatus;

  constructor(
    order: { 
      customer: Customer | null;
      products: OrderProduct[];
      total: number;
      status: OrderStatusValue;
      statusNum: number;
      //paymentStatus: OrderpaymentStatusValue
      
    } & T
  ) {
    super(order);
    this.customer = order.customer;
    this.products = order.products;
    this.total = order.total;
    this.status = new OrderStatus(order.status);
    this.statusNum = order.statusNum;
    //this.paymentStatus = new OrderpaymentStatus(order.paymentStatus);
  }

  update(order: { status: OrderStatus; statusNum: number }) {
    this.status = new OrderStatus(order.status.getValue());
    this.statusNum = order.statusNum;
  }
}

export class Order extends _Order<PersistedEntity> {}

export class NotPersistedOrder extends _Order<NotPersistedEntity> {}