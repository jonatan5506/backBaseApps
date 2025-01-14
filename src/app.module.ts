import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutosModule } from './produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { PostgresConfigService } from './config/db.config.service';
//import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    ProdutosModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }), //Configurar o uso do .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres', // Aqui é o db de manutenção padrão
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  //controllers: [],
  //providers: [],
})
export class AppModule {}
