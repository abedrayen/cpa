"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const categories_module_1 = require("../categories/categories.module");
const products_module_1 = require("../products/products.module");
const orders_module_1 = require("../orders/orders.module");
const admin_categories_controller_1 = require("./admin-categories.controller");
const admin_products_controller_1 = require("./admin-products.controller");
const admin_orders_controller_1 = require("./admin-orders.controller");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [categories_module_1.CategoriesModule, products_module_1.ProductsModule, orders_module_1.OrdersModule],
        controllers: [
            admin_categories_controller_1.AdminCategoriesController,
            admin_products_controller_1.AdminProductsController,
            admin_orders_controller_1.AdminOrdersController,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map