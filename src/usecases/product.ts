import { exit } from "process";
import { NotFoundException } from '@nestjs/common';
import { ProductRepository } from "../repository/ports/product.repository";
import { ProductDto } from "../types/dtos/product.dto";
import { NotPersistedProduct } from 'src/entities/domain/product';

export class ProductUseCases {
    constructor(private productRepository: ProductRepository){}

    async creteProduct(product){
        const newProduct = new NotPersistedProduct(product);
        return new ProductDto( await this.productRepository.create(newProduct));
    }

    async findProduct(category){
        const products = await this.productRepository.findByCategory(category);
        return products.map(product => new ProductDto(product));
    }

    async updateProduct (id, product){
        const persistedProduct = await this.productRepository.find(id);
        if (!persistedProduct) {
            throw new NotFoundException('Product not found');
        }
        return new ProductDto(await this.productRepository.update(id, product));
    }

    async deleteProduct(id){        
        return  await this.productRepository.delete(id);
    }
}