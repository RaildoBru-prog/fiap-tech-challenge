import { Module } from '@nestjs/common';
export * from './product';
import { ProductUseCases } from './product';
import { CustomerUseCases } from './customer';
import { OrderUseCases } from './order';

@Module({
    exports: [CustomerUseCases, ProductUseCases, OrderUseCases]
})

export class UseCases {}