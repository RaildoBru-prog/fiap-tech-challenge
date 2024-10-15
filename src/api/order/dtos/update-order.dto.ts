import { ApiProperty } from "@nestjs/swagger";
import { OrderStatusValue } from "src/entities/domain/value-objects/order-status";

export class UpdateOrderDto {
  @ApiProperty({name : 'status', enum: OrderStatusValue })
  status: OrderStatusValue;
}
