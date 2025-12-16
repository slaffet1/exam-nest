import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/service/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.model';
import { ProductFilterInterceptor } from 'src/interceptors/product-filter.interceptor';
import { ProductChatGateway } from './chat/product-chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ProductsController],
  providers: [ProductsService,ProductFilterInterceptor,ProductChatGateway ],
  exports: [ProductsService]
})
export class ProductsModule {}