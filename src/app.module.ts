import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { WebhookController } from './webhook.controller';
@Module({
  imports: [ApiModule],
  controllers: [AppController,WebhookController],
  providers: [AppService],
})
export class AppModule {}
