import { Module } from '@nestjs/common';
export * from './product';
import { ProductUseCases } from './product';
import { CustomerUseCases } from './customer';

@Module({
    exports: [CustomerUseCases, ProductUseCases]
})

export class UseCases {}