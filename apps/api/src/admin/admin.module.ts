import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { AdminProductsController } from './admin-products.controller';
import { AdminOrdersController } from './admin-orders.controller';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [AdminProductsController, AdminOrdersController],
})
export class AdminModule {}
