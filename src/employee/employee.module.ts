import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import {EmployeeService} from 'src/service/employee/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}