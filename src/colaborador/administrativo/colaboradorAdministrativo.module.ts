import { Module } from '@nestjs/common';
import { ColaboradorAdministrativoController } from './colaboradorAdministrativo.controller';
import { ColaboradorAdministrativoRepository } from './colaboradorAdministrativo.repository';
import { ValidadorDeEmail } from './validacao/emailvalidator';
import { ValidadorDeCpf } from './validacao/cpfvalidator';

@Module({
  controllers: [ColaboradorAdministrativoController],
  providers: [
    ColaboradorAdministrativoRepository,
    ValidadorDeEmail,
    ValidadorDeCpf,
  ],
})
export class ColaboradorAdministrativoModule {}
