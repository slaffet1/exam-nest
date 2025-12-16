import { Module } from '@nestjs/common';
import { EmployeeController } from './med-ali-dridi-employee.controller';
import {EmployeeService} from 'src/service/employee/med-ali-dridi-employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './med-ali-dridi-employee.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}