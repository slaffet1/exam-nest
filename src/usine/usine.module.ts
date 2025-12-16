import { Module } from '@nestjs/common';
import { UsineController } from './usine.controller';
import {UsineService} from 'src/service/usine/usines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsineStatutInterceptor } from 'src/interceptors/usine-filter.interceptor';
import { Usine } from './usine.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usine])
  ],
  controllers: [UsineController],
  providers: [UsineService,UsineStatutInterceptor ],
  exports: [UsineService]
})
export class UsineModule {}