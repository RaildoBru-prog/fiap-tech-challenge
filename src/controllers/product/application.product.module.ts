import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PersistenceProductModule } from 'src/interfaces/product/persistence.product.module';

@Module({
  imports: [PersistenceProductModule],
  providers: [ProductController],
  exports: [ProductController]
})
export class ApplicationProductModule {}
