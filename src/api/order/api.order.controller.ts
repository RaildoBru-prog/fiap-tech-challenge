import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
////import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderController } from 'src/controllers/order/order.controller';
import { UpdateOrderDto } from './dtos/update-order.dto'

@ApiTags('order')
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

	@Get('/status')
	@HttpCode(200)
	findSort(){
		return this.orderController.findSort();
	}

	@Put('/:id')
  		update(@Param('id') id: string, @Body() status: UpdateOrderDto )  {
		return this.orderController.updateOrder(id, status);
  	}
}