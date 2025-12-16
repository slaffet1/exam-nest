import { IsNotEmpty,IsString,IsNumber,Min, isString } from "class-validator";
export class creatProductDto{
    @IsString()
    @IsNotEmpty({message:'le nom du produit est obligatoire '})
    name:string
    @IsNumber()
    @Min(0, {message:'le prix doit etre positif '})
    @IsNotEmpty()
    price:number;
    @IsString()
    @IsNotEmpty({ message: 'La catégorie est obligatoire' })
    category: string;
    @IsNumber()
    @Min(0, { message: 'Le stock doit être positif' })
    @IsNotEmpty()
    stock: number;
    @IsString()
    @IsNotEmpty()
    status: string;
    
    

}