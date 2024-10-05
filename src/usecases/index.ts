import { Module } from '@nestjs/common';
export * from './product';
import { CustomerUseCases } from './customer';

@Module({
    exports: [CustomerUseCases]
})

export class UseCases {}