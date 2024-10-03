import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { PersistenceCustomerModule } from 'src/interfaces/customer/persistence.customer.module';

@Module({
  imports: [PersistenceCustomerModule],
  providers: [CustomerController],
  exports: [CustomerController]
})
export class ApplicationCustomerModule {}
