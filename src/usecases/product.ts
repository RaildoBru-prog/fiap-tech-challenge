import { exit } from "process";
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
        products.map(product => new ProductDto(product));
        return products;
    }   
}