import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Public()
  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.products.findAll(query);
  }

  @Public()
  @Get('category/:categorySlug')
  findByCategory(@Param('categorySlug') categorySlug: string, @Query() query: ProductQueryDto) {
    return this.products.findAll(query, categorySlug);
  }

  @Public()
  @Get(':slug/related')
  async findRelated(
    @Param('slug') slug: string,
    @Query('limit') limit?: string,
  ) {
    const product = await this.products.findBySlug(slug);
    return this.products.findRelated(
      product.id,
      product.categoryId,
      limit ? parseInt(limit, 10) : 4,
    );
  }

  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.products.findBySlug(slug);
  }
}
