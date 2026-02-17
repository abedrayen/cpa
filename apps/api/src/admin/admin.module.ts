import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { AdminProductsController } from './admin-products.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminStatsController } from './admin-stats.controller';
import { AdminUploadController } from './admin-upload.controller';
import { AdminStatsService } from './admin-stats.service';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [
    AdminProductsController,
    AdminOrdersController,
    AdminStatsController,
    AdminUploadController,
  ],
  providers: [AdminStatsService],
})
export class AdminModule {}
