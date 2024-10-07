import { Product } from "src/entities/domain/product";
import { ProductCategoryValue } from "src/entities/domain/value-objects/product-category";

export class ProductDto {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategoryValue;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.category = product.category.getValue();
  }
}