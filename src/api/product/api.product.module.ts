import { Module } from '@nestjs/common';
import { ApiProductController } from './api.product.controller';
import { ApplicationProductModule } from 'src/controllers/product/application.product.module';

@Module({
  imports: [ApplicationProductModule],
  controllers: [ApiProductController]
})
export class ApiProductModule {}


/*
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ApplicationProductModule } from 'src/core/application/services/product/application.product.module';

@Module({
  imports: [ApplicationProductModule],
  controllers: [ProductController]
})
export class ApiProductModule {}


import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ApplicationProductModule } from 'src/core/application/services/product/application.product.module';

@Module({
  imports: [ApplicationProductModule],
  controllers: [ProductController]
})
export class ApiProductModule {}*/
