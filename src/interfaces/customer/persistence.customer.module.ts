import { Module } from '@nestjs/common';
import { CustomerRepository } from 'src/application/ports/customer.repository';
import { PrismaCustomerRepository } from './customer.repository';
import { PrismaService } from '../prisma.service';
import { CustomerMapper } from './customer.mapper';


@Module({
  providers: [
    PrismaService,
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository
    },
    CustomerMapper
  ],
  exports: [CustomerRepository]
})
export class PersistenceCustomerModule {}
