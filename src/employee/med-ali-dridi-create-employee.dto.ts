import { IsNotEmpty, IsString, IsNumber, Min, IsBoolean } from 'class-validator';

export class CreateEmployeeDto{

    @IsString()
    @IsNotEmpty()
    fullnom?:string
    @IsNumber()
      @Min(0, { message: 'Le nombre d\'employés doit être positif' })
      @IsNotEmpty()
      Rank: number;
    @IsNumber()
      @Min(0, { message: 'Le nombre d\'employés doit être positif' })
      @IsNotEmpty()
      Salary: number;
}