import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { PersistenceOrderModule } from "src/persistence/order/persistence.order.module";
import { PersistenceCustomerModule } from "src/persistence/customer/persistence.customer.module";
import { PersistenceProductModule } from "src/persistence/product/persistence.product.module";

@Module({
    imports: [PersistenceOrderModule, PersistenceProductModule, PersistenceCustomerModule],
    providers: [OrderController],
    exports: [OrderController],
})
export class ApplicationOrderModule {}