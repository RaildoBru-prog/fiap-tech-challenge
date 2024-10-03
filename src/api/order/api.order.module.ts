import { Module } from '@nestjs/common';
import { ApiOrderController } from './api.order.controller';
import { ApplicationOrderModule } from 'src/controllers/order/application.order.module';

@Module({
	imports: [ApplicationOrderModule],
	controllers: [ApiOrderController],
})
export class ApiOrderModule{}






/*
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ApplicationOrderModule } from 'src/core/application/services/order/application.order.module';

@Module({
  imports: [ApplicationOrderModule],
  controllers: [OrderController],
})
export class ApiOrderModule {}

*/ 