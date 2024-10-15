import { Order } from "src/entities/domain/order";
import { OrderStatusValue } from "src/entities/domain/value-objects/order-status";
import { OrderStatusNumValue } from "src/entities/domain/value-objects/order-status-num";
import { OrderpaymentStatusValue } from "src/entities/domain/value-objects/order-payment-status";
import { ProductCategoryValue } from "src/entities/domain/value-objects/product-category";

export class OrderDto {
  id: string;
  products: {
    name: string,
    price: number,
    quantity: number,
    description: string,
    category: ProductCategoryValue
  }[];
  total: number;
  status: OrderStatusValue;
  statusNum: number;
  customer: {
    name: string,
    email: string,
    document: string
  } | null;

  constructor(order: Order) {
    this.id = order.id;
    this.products = order.products.map(p => ({
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      description: p.description,
      category: p.category.getValue()
    }));
    this.total = order.total;
    this.status = order.status.getValue();
    this.statusNum = order.statusNum;
    this.customer = order.customer
      ? {
        name: order.customer.name,
        email: order.customer.email,
        document: order.customer.document
      }
      : null;
  }
}
