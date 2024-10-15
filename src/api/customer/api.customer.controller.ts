import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginCustomerDto } from './dtos/login-customer.dto';
import { CustomerController } from 'src/controllers/customer/customer.controller';

@ApiTags('customer')
@Controller('customer')
export class ApiCustomerController {
  constructor(private customerController: CustomerController) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = this.customerController.create(createCustomerDto);
    return customer;
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customerController.login(loginCustomerDto.email, loginCustomerDto.document);
  }

}