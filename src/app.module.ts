import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { from } from 'rxjs';
import { join} from 'path';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.model';
import { Usine } from './usine/usine.model';
import { UsineService } from './service/usine/usines.service';
import { UsineModule } from './usine/usine.module';
import { EmployeeModule } from './employee/med-ali-dridi-employee.module';
import { Employee } from './employee/med-ali-dridi-employee.model';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      serveRoot:'/chat'


    }),
    TypeOrmModule.forRoot({
      type:'mongodb',
      host:'localhost',
      port:27017,
      database:'exam_practice_db',
      entities:[Product,Usine,Employee],
      synchronize:true,
    }),
    ProductsModule,
    UsineModule,
    EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
