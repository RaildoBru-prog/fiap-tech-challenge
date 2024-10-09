import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../repository/ports/product.repository';
import { ProductCategoryValue } from 'src/entities/domain/value-objects/product-category';
import { CreateProductDto } from './dtos/create-product.dto';
import  { ProductUseCases } from 'src/usecases/product';

@Injectable()
export class ProductController {
	constructor(private productRepository: ProductRepository) {}

	createProduct(product: CreateProductDto){
		const productCase = new ProductUseCases(this.productRepository);
    return productCase.creteProduct(product);
	}

	async findByCategory(category: ProductCategoryValue) {
    const productCase = new ProductUseCases(this.productRepository);
    return await productCase.findProduct(category);
  }

	async updateProduct(id: string, product: CreateProductDto) {
    const productCase = new ProductUseCases(this.productRepository);
    return await productCase.updateProduct(id, product);
  }

  async deleteProduct(id: string){
    const productCase = new ProductUseCases(this.productRepository);
    return await productCase.deleteProduct(id);
  }
}
