import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { creatProductDto } from 'src/products/create-product.dto';
import { Product } from 'src/products/product.model';
import { MongoRepository, ObjectId } from 'typeorm';
@Injectable()
export class ProductsService{

    getshowhello():string{
        return "hello 4twin8"
    }
    constructor(@InjectRepository(Product) private readonly productRepository:MongoRepository<Product>){}
     async createProduct(data:Partial<creatProductDto>){
      try{     
        if(!data){      
             throw new NotFoundException
        }
           const productNew= await this.productRepository.create(data)
        return await this.productRepository.save(productNew)
      }catch(error){
        console.log('erreur'+error.message)
        throw new InternalServerErrorException
      };
    

    }
    async findall():Promise<Product[]>{
    try{        
        const product =await this.productRepository.find()
        if(product.length==0) throw new NotFoundException()
        return product;

    }  
    catch(error){
        throw new InternalServerErrorException(error.message)
}
}
async finonebyid(id:ObjectId):Promise<Product | null>{
  try{ 
    const product=await this.productRepository.findOneBy(id)
    if(!product) throw new NotFoundException()
    return  product
  }catch(error){
    throw new InternalServerErrorException(error.message)
  }
}
async updateproduct(id:ObjectId,data:Product):Promise<Product | null>{
  try{
    const product=await this.productRepository.findOneBy(id)
    if(!product){
      throw new NotFoundException()
    }
    //const res= await this.productRepository.create(id,data)
    const res= await this.productRepository.update(id,data)
    return  await this.productRepository.findOneBy(id)
  }catch(error){
    throw new InternalServerErrorException(error.message)
  }
}
async deleteproduct(id:ObjectId):Promise<string>{
  try{
    const product=await this.productRepository.findOneBy(id)
    if(!product){
      throw new NotFoundException()
    }
    const res=await this.productRepository.remove(product)
    return'product deleted';
  }catch(error){
    throw new InternalServerErrorException(error.message)
  }
}
// Question 2 : Utilisateurs non mis à jour depuis 6 mois
async getproductsNotUpdatedSince6Months(): Promise<Product[]> {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const products = await this.productRepository.find({
      where: {
        updatedAt: { $lt: sixMonthsAgo }
      }
    });
    return products;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
}





}