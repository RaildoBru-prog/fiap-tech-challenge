import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
//import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderController } from 'src/controllers/order/order.controller';

@Controller('order')
export class ApiOrderController {
	constructor(private orderController: OrderController) {}

	@Post()
	create(@Body() createOrderDto: CreateOrderDto){
		return this.orderController.createrOrder(createOrderDto)
	}

	@Get()
	@HttpCode(200)
	findAll(){
		return this.orderController.findAll();
	}

}