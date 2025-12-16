import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors } from '@nestjs/common';
import { UsineService } from '../service/usine/usines.service';
import { CreateUsineDto } from './create-usine.dto';
import { UpdateUsineDto } from './update-usine.dto';
import { ObjectId } from 'mongodb';
import { UsineStatutInterceptor } from '../interceptors/usine-filter.interceptor';

@Controller('usine')
@UseInterceptors(UsineStatutInterceptor)
export class UsineController {
  
  constructor(private readonly usineService: UsineService) {}

  // CREATE
  @Post()
  async create(@Body() data: CreateUsineDto) {
    return await this.usineService.createUsine(data);
  }

  // READ ALL
  @Get()
  async findAll() {
    return await this.usineService.findAll();
  }

  // READ ONE
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usineService.findOneById(new ObjectId(id));
  }

  // UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUsineDto) {
    return await this.usineService.updateUsine(new ObjectId(id), data);
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usineService.deleteUsine(new ObjectId(id));
  }
}