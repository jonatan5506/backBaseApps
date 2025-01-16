// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

// @Injectable()
// export class PostgresConfigService implements TypeOrmOptionsFactory {
//   constructor(private configService: ConfigService) {}

//   createTypeOrmOptions(/*connectionName?: string*/): TypeOrmModuleOptions {
//     return {
//       type: 'postgres',
//       host: this.configService.get<string>('DB_HOST', '127.0.0.1'), // Usando ConfigService
//       port: this.configService.get<number>('DB_PORT', 5432), // Usando ConfigService
//       username: this.configService.get<string>('DB_USER', 'postgres'), // Usando ConfigService
//       password: this.configService.get<string>('DB_PASSWORD', 'postgres'), // Usando ConfigService
//       database: this.configService.get<string>('DB_NAME', 'myappdb'), // Usando ConfigService
//       entities: [], // Coloque suas entidades aqui
//       synchronize: true, // Cuidado com isso em produção
//     };
//   }
// }
