import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto } from 'src/employee/med-ali-dridi-create-employee.dto';
import { Employee } from 'src/employee/med-ali-dridi-employee.model';
import { MongoRepository, ObjectId } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) 
    private readonly employeeRepository: MongoRepository<Employee>
  ) {}

  async createEmployee(data: Partial<CreateEmployeeDto>) {
    try {
      if (!data) {
        throw new NotFoundException('Données manquantes');
      }
      const employeeNew = await this.employeeRepository.create(data);
      return await this.employeeRepository.save(employeeNew);
    } catch (error) {
      console.log('erreur: ' + error.message);
      throw new InternalServerErrorException('Erreur lors de la création de l\'employé');
    }
  }

  async findall(): Promise<Employee[]> {
    try {
      const employee = await this.employeeRepository.find();
      if (employee.length == 0) {
        throw new NotFoundException('Aucun employé trouvé');
      }
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async finonebyid(id: ObjectId): Promise<Employee | null> {
    try {
      const employee = await this.employeeRepository.findOneBy(id);
      if (!employee) {
        throw new NotFoundException('Employé non trouvé');
      }
      return employee;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: ObjectId): Promise<string> {
    try {
      const employee = await this.employeeRepository.findOneBy(id);
      if (!employee) {
        throw new NotFoundException('Employé non trouvé');
      }
      await this.employeeRepository.remove(employee);
      return 'Employé supprimé avec succès';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateemployee(id: ObjectId, data: Employee): Promise<Employee | null> {
    try {
      const user = await this.employeeRepository.findOneBy(id);
      if (!user) {
        throw new NotFoundException('Employé non trouvé');
      }
      await this.employeeRepository.update(id, data);
      return await this.employeeRepository.findOneBy(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async findOneByName(fullnom: string): Promise<Employee | null> {
    try {

      const trimmedName = fullnom.trim();
  
      const employee = await this.employeeRepository.findOne({
        where: {
          fullnom: { 
            $regex: new RegExp(`^${trimmedName}\\s*$`, 'i') 
          }
        } as any
      });
      
      if (!employee) {
        throw new NotFoundException(`Employé "${trimmedName}" non trouvé`);
      }
      return employee;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async increaseSalary(id: string, percentage: number): Promise<Employee> {
    try {
      const objectId = new ObjectId(id);
      const employe = await this.employeeRepository.findOne({
        where: { _id: objectId } as any,
      });
      
      if (!employe) {
        throw new NotFoundException('Employé non trouvé');
      }
      

      employe.Salary += employe.Salary * (percentage / 100);
      
      return await this.employeeRepository.save(employe);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async rankGreaterThan(rank: number): Promise<Employee[]> {
    try {
      return await this.employeeRepository.find({
        where: { Rank: { $gt: rank } } as any,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async salaryGreaterThanAverage(): Promise<Employee[]> {
    try {
      const employes = await this.employeeRepository.find();
      
      if (employes.length === 0) {
        return [];
      }
      
    
      const totalSalary = employes.reduce((sum, emp) => sum + emp.Salary, 0);
      const averageSalary = totalSalary / employes.length;
      
      return employes.filter(emp => emp.Salary > averageSalary);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}