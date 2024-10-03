import { ValueObject } from "./value-object";

export enum ProductCategoryValue {
  Food = "Food",
  Beverage = "Beverage",
  Snack = "Snack",
  Dessert = "Dessert"
}

export class ProductCategory extends ValueObject<ProductCategoryValue> {}