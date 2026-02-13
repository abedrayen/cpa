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
  @Get(':slug/related')
  findRelated(@Param('slug') slug: string, @Query('limit') limit?: string) {
    return this.products.findBySlug(slug).then((product) =>
      this.products.findRelated(product.id, limit ? parseInt(limit, 10) : 4),
    );
  }

  @Public()
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.products.findBySlug(slug);
  }
}
