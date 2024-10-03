import { Module } from '@nestjs/common';
import { ApiCustomerController } from './api.customer.controller';
import { ApplicationCustomerModule } from 'src/controllers/customer/application.customer.module';

@Module({
  imports: [ApplicationCustomerModule],
  controllers: [ApiCustomerController],
})
export class ApiCustomerModule {}
