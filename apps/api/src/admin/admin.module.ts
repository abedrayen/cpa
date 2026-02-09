import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { AdminCategoriesController } from './admin-categories.controller';
import { AdminProductsController } from './admin-products.controller';
import { AdminOrdersController } from './admin-orders.controller';

@Module({
  imports: [CategoriesModule, ProductsModule, OrdersModule],
  controllers: [
    AdminCategoriesController,
    AdminProductsController,
    AdminOrdersController,
  ],
})
export class AdminModule {}
