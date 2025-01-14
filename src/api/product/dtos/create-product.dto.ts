import { ApiProperty } from "@nestjs/swagger";
import { ProductCategoryValue } from "src/entities/domain/value-objects/product-category";
import { OrderStatusValue } from "src/entities/domain/value-objects/order-status";

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty({ name: 'category', enum: ProductCategoryValue})
  category: ProductCategoryValue;
}