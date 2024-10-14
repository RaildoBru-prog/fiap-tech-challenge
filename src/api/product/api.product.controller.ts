import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductCategoryValue } from 'src/entities/domain/value-objects/product-category';

//import { NotFoundError } from 'src/core/application/errors/not-found.error';
import { ProductController } from 'src/controllers/product/product.controller';
// /import { Request, Response } from "express";

@ApiTags('product')
@Controller('product')
export class ApiProductController {
  constructor(private productController: ProductController) {}

  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'category', enum: ProductCategoryValue })
  async find(@Query('category') category: ProductCategoryValue) {
    return await this.productController.findByCategory(category);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productController.createProduct(createProductDto);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productController.updateProduct(id, updateProductDto);
  }
}
  