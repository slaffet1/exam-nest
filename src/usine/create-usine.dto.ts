import { IsNotEmpty, IsString, IsNumber, Min, IsBoolean } from 'class-validator';

export class CreateUsineDto {
  
  @IsString()
  @IsNotEmpty({ message: 'Le nom de l\'usine est obligatoire' })
  nom: string;

  @IsString()
  @IsNotEmpty({ message: 'L\'adresse est obligatoire' })
  adresse: string;

  @IsNumber()
  @Min(0, { message: 'Le nombre d\'employés doit être positif' })
  @IsNotEmpty()
  nbrEmployee: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'Le statut est obligatoire' })
  statut: boolean;
}