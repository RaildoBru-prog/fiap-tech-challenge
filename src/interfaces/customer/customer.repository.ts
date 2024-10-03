import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CustomerRepository } from 'src/application/ports/customer.repository';
import { NotPersistedCustomer } from 'src/entities/domain/customer';
import { CustomerMapper } from './customer.mapper';


/*
import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/application/ports/product.repository';
import { NotPersistedProduct, Product } from 'src/entities/domain/product';
import { ProductCategoryValue } from 'src/entities/domain/value-objects/product-category';
import { PrismaService } from '../interfaces/prisma.service';
import { ProductMapper } from './product.mapper';
import { NotFoundError } from 'src/application/errors/not-found.error';
*/

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(
    private prismaService: PrismaService,
    private customerMapper: CustomerMapper
  ) {}

  async create(customer: NotPersistedCustomer) {
    const persistedCustomer = await this.prismaService.customer.create({
      data: {
        name: customer.name,
        email: customer.email,
        document: customer.document
      }
    });
    return this.customerMapper.fromPersistence(persistedCustomer);
  }

  async findByEmailAndDocument(email: string, document: string) {
    const persistedCustomer = await this.prismaService.customer.findFirst({
      where: {
        email,
        document
      }
    });
    if (!persistedCustomer) return null;
    return this.customerMapper.fromPersistence(persistedCustomer);
  }

  async findByID(id: string) {
    const persistedCustomer = await this.prismaService.customer.findUnique({
      where: {
        id
      }
    });
    if (!persistedCustomer) return null
    return this.customerMapper.fromPersistence(persistedCustomer);
  }
}
