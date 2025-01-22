import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaColaboradorAdministrativoDTO } from './dto/criaColaboradorAdministrativo';
import { ColaboradorAdministrativoEntity } from './colaboradorAdministrativo.entity';
import { ListaColaboradorAdministrativoDTO } from './dto/listaColaboradorAdministrativo.dto';
import { AtualizaColaboradorAdministrativoDTO } from './dto/atualizaColaboradorAdministrativo.dto';
import { ColaboradorAdministrativoService } from './colaboradorAdministrativoService';

import { v4 as uuid } from 'uuid';

@Controller('/colaborador/administrativo')
export class ColaboradorAdministrativoController {
  constructor(private colaboradorService: ColaboradorAdministrativoService) {}

  @Post()
  async criaColaborador(
    @Body() dadosDoColaborador: CriaColaboradorAdministrativoDTO,
  ) {
    try {
      const colaboradorEntity = new ColaboradorAdministrativoEntity();
      colaboradorEntity.celular = dadosDoColaborador.celular;
      colaboradorEntity.cpf = dadosDoColaborador.cpf;
      colaboradorEntity.dataDeNascimento = dadosDoColaborador.dataDeNascimento;
      colaboradorEntity.email = dadosDoColaborador.email;
      colaboradorEntity.imagem = dadosDoColaborador.imagem;
      colaboradorEntity.nome = dadosDoColaborador.nome;
      colaboradorEntity.id = uuid();

      this.colaboradorService.criaColaborador(colaboradorEntity);
      return {
        colaborador: new ListaColaboradorAdministrativoDTO(
          colaboradorEntity.id,
          colaboradorEntity.nome,
        ),
        mensagem: 'Colaborador criado com sucesso!',
      };
    } catch (error) {
      throw new Error(`Erro ao cadastrar colaborador: \n ${error}`);
    }
  }

  @Get()
  async listaColaboradores() {
    return await this.colaboradorService.listaColaboradores();
  }

  @Put('/:id')
  async atualizaColaborador(
    @Param('id') id: string,
    @Body() novosDados: AtualizaColaboradorAdministrativoDTO,
  ) {
    await this.colaboradorService.atualizaColaborador(id, novosDados);
    return {
      mensagem: 'Colaborador atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletaColaborador(@Param('id') id: string) {
    const colaboradorDeletado =
      await this.colaboradorService.deletaColaborador(id);
    return {
      colaborador: colaboradorDeletado,
      mensagem: 'Colaborador deletado com sucesso!',
    };
  }
}
