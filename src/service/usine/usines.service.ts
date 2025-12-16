import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsineDto } from 'src/usine/create-usine.dto';
import { UpdateUsineDto } from 'src/usine/update-usine.dto';
import { Usine } from 'src/usine/usine.model';
import { MongoRepository, ObjectId } from 'typeorm';

@Injectable()
export class UsineService {
  
  constructor(
    @InjectRepository(Usine) 
    private readonly usineRepository: MongoRepository<Usine>
  ) {}

  // CREATE
  async createUsine(data: Partial<CreateUsineDto>) {
    try {
      if (!data) {
        throw new NotFoundException('Données manquantes');
      }
      
      data['createdAt'] = new Date();
      data['updatedAt'] = new Date();
      
      const usineNew = this.usineRepository.create(data);
      return await this.usineRepository.save(usineNew);
      
    } catch (error) {
      console.log('Erreur: ' + error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  // READ ALL
  async findAll(): Promise<Usine[]> {
    try {
      const usines = await this.usineRepository.find();
      if (usines.length === 0) {
        throw new NotFoundException('Aucune usine trouvée');
      }
      return usines;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // READ ONE
  async findOneById(id: ObjectId): Promise<Usine | null> {
    try {
      const usine = await this.usineRepository.findOneBy(id);
      if (!usine) {
        throw new NotFoundException('Usine non trouvée');
      }
      return usine;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // UPDATE
  async updateUsine(id: ObjectId, data: UpdateUsineDto): Promise<Usine | null> {
    try {
      const usine = await this.usineRepository.findOneBy(id);
      if (!usine) {
        throw new NotFoundException('Usine non trouvée');
      }
      
      data['updatedAt'] = new Date();
      await this.usineRepository.update(id, data as any);
      return await this.usineRepository.findOneBy(id);
      
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // DELETE
  async deleteUsine(id: ObjectId): Promise<string> {
    try {
      const usine = await this.usineRepository.findOneBy(id);
      if (!usine) {
        throw new NotFoundException('Usine non trouvée');
      }
      await this.usineRepository.remove(usine);
      return 'Usine supprimée avec succès';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}