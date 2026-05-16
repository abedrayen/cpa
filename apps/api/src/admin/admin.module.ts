import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { AuthModule } from '../auth/auth.module';
import { AdminProductsController } from './admin-products.controller';
import { AdminOrdersController } from './admin-orders.controller';
import { AdminStatsController } from './admin-stats.controller';
import { AdminUploadController } from './admin-upload.controller';
import { AdminAccountController } from './admin-account.controller';
import { AdminStatsService } from './admin-stats.service';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule],
  controllers: [
    AdminProductsController,
    AdminOrdersController,
    AdminStatsController,
    AdminUploadController,
    AdminAccountController,
  ],
  providers: [AdminStatsService],
})
export class AdminModule {}
