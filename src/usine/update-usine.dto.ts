import { PartialType } from '@nestjs/mapped-types';
import { CreateUsineDto } from './create-usine.dto';

export class UpdateUsineDto extends PartialType(CreateUsineDto) {}