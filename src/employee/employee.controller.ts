import { Controller, Get, Post, Put, Delete, Body, Param, UseInterceptors, Query, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { EmployeeService } from '../service/employee/employee.service';
import { CreateEmployeeDto } from './create-employee.dto';
import { ObjectId } from 'mongodb';
import { Employee } from './employee.model';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
  @Post()
  async create(@Body() data: CreateEmployeeDto) {
    console.log('data' + data)
    return await this.employeeService.createEmployee(data);
  }
  
  @Get()
  async findAll() {
    return await this.employeeService.findall();
  }
  
  // ✅ Route de recherche par nom - DOIT ÊTRE AVANT :id
  @Get('searchByName')
  async SearchBYname(@Query('nom') fullnom: string) {
    if (!fullnom) {
      throw new BadRequestException('Le paramètre "nom" est requis');
    }
    return await this.employeeService.findOneByName(fullnom);
  }
  
  @Get('rank/:rank')
  getByRankGreaterThan(
    @Param('rank', ParseIntPipe) rank: number,
  ) {
    return this.employeeService.rankGreaterThan(rank);
  }
  
  @Get('aboveAverage')
  getSalaryAboveAverage() {
    return this.employeeService.salaryGreaterThanAverage();
  }
  
  // ✅ Route :id en dernier pour éviter les conflits
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }
    return await this.employeeService.finonebyid(new ObjectId(id));
  }
  
  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }
    return await this.employeeService.delete(new ObjectId(id));
  }
  
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Employee) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }
    return await this.employeeService.updateemployee(new ObjectId(id), data);
  }
  
  @Post('increasSalary/:id')
  async increaseSalary(
    @Param('id') id: string,
    @Body('percentage') percentage: number,
  ) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException('ID invalide');
    }
    return this.employeeService.increaseSalary(id, percentage);
  }
}