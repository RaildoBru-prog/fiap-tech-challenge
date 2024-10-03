import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
//import { ApiTags } from '@nestjs/swagger';
import { LoginCustomerDto } from './dtos/login-customer.dto';
import { CustomerController } from 'src/controllers/customer/customer.controller';


//@ApiTags('customer')
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

/*
import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
//import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductCategoryValue } from 'src/entities/domain/value-objects/product-category';

//import { NotFoundError } from 'src/core/application/errors/not-found.error';
import { ProductController } from 'src/controllers/product/product.controller';
// /import { Request, Response } from "express";

//@ApiTags('product')
@Controller('product')
export class ApiProductController {
  constructor(private productController: ProductController) {}

  @Get()
  @HttpCode(200)
  //@ApiQuery({ name: 'category', enum: ProductCategoryValue })
  async find(@Query('category') category: ProductCategoryValue) {
    return await this.productController.findByCategory(category);
  }
*/