import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors } from '@nestjs/common';
import { ProductsService } from 'src/service/products/products.service';
import { creatProductDto } from './create-product.dto';
import { Product } from './product.model';
import { ObjectId } from 'mongodb';
import { ProductFilterInterceptor } from '../interceptors/product-filter.interceptor';
@UseInterceptors(ProductFilterInterceptor) 

@Controller('products')
export class ProductsController {
  
  constructor(private readonly productsService: ProductsService) {}

  @Get('hello')
  getHello(): string {
    return this.productsService.getshowhello();
  }

  @Get('stock/out')
  async findOutOfStock() {
    return await this.productsService.findall();
  }
  @Get('old/6months')
  async getOldProducts() {
    return await this.productsService.getproductsNotUpdatedSince6Months();
  }

  @Get()
  async findAll() {
    return await this.productsService.findall();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.finonebyid(new ObjectId(id));
  }
  @Post()
  async create(@Body() data: creatProductDto) {
    return await this.productsService.createProduct(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Product) {
    return await this.productsService.updateproduct(new ObjectId(id), data);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productsService.deleteproduct(new ObjectId(id));
  }
}