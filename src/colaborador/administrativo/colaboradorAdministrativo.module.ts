import { Module } from '@nestjs/common';
import { ColaboradorAdministrativoController } from './colaboradorAdministrativo.controller';
import { ColaboradorAdministrativoRepository } from './colaboradorAdministrativo.repository';
import { ValidadorDeEmail } from './validacao/emailValidator';
import { ValidadorDeCpf } from './validacao/cpfValidator';

@Module({
  controllers: [ColaboradorAdministrativoController],
  providers: [
    ColaboradorAdministrativoRepository,
    ValidadorDeEmail,
    ValidadorDeCpf,
  ],
})
export class ColaboradorAdministrativoModule {}
