import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { PersistenceOrderModule } from "src/interfaces/order/persistence.order.module";
import { PersistenceCustomerModule } from "src/interfaces/customer/persistence.customer.module";
import { PersistenceProductModule } from "src/interfaces/product/persistence.product.module";

@Module({
    imports: [PersistenceOrderModule, PersistenceProductModule, PersistenceCustomerModule],
    providers: [OrderController],
    exports: [OrderController],
})
export class ApplicationOrderModule {}