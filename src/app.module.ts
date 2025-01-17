import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorAdministrativoModule } from './colaborador/administrativo/colaboradorAdministrativo.module';
import { PostgresConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ColaboradorAdministrativoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), //Configurar o uso do .env
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  //controllers: [],
  //providers: [],
})
export class AppModule {}
