import { ProductCategoryValue } from "src/entities/domain/value-objects/product-category";

export class CreateProductDto {
  name: string;
  price: number;
  description: string;
  category: ProductCategoryValue;
}