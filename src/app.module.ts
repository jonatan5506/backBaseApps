import { Module } from '@nestjs/common';
import { ColaboradorAdministrativoModule } from './colaborador/administrativo/colaboradorAdministrativo.module';

@Module({
  imports: [ColaboradorAdministrativoModule],
  //controllers: [],
  //providers: [],
})
export class AppModule {}
