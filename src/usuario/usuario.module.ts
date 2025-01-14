import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
//import { ValidadorDeEmail } from './validacao/emailvalidator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository /*ValidadorDeEmail*/], //Necessário para Injeção de Dependencias
})
export class UsuarioModule {}
