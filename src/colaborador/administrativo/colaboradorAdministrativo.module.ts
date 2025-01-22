import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColaboradorAdministrativoController } from './colaboradorAdministrativo.controller';
import { ColaboradorAdministrativoRepository } from './colaboradorAdministrativo.repository';
import { ValidadorDeEmail } from './validacao/emailValidator';
import { ValidadorDeCpf } from './validacao/cpfValidator';
import { ColaboradorAdministrativoEntity } from './colaboradorAdministrativo.entity';
import { ColaboradorAdministrativoService } from './colaboradorAdministrativoService';
import { BuscadorDeCpf } from './validacao/cpfExistValidator';

@Module({
  // Habilita o service
  imports: [TypeOrmModule.forFeature([ColaboradorAdministrativoEntity])],
  controllers: [ColaboradorAdministrativoController],
  providers: [
    ColaboradorAdministrativoService, // adiciona o service
    ColaboradorAdministrativoRepository,
    ValidadorDeEmail,
    ValidadorDeCpf,
    BuscadorDeCpf,
  ],
})
export class ColaboradorAdministrativoModule {}
