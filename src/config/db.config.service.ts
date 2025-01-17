import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'), // Usando ConfigService
      port: this.configService.get<number>('DB_PORT'), // Usando ConfigService
      username: this.configService.get<string>('DB_USER'), // Usando ConfigService
      password: this.configService.get<string>('DB_PASSWORD'), // Usando ConfigService
      database: this.configService.get<string>('DB_NAME'), // Usando ConfigService
      entities: [__dirname + '/../**/*.entity{.js,.ts}'], // Coloque suas entidades aqui
      synchronize: true, // Cuidado com isso em produção
    };
  }
}
