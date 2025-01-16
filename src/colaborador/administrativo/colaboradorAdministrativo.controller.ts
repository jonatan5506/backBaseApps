import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ColaboradorAdministrativoRepository } from './colaboradorAdministrativo.repository';
import { CriaColaboradorAdministrativoDTO } from './dto/criaColaboradorAdministrativo';
import { ColaboradorAdministrativoEntity } from './colaboradorAdministrativo.entity';
import { ListaColaboradorAdministrativoDTO } from './dto/listaColaboradorAdministrativo.dto';
import { AtualizaColaboradorAdministrativoDTO } from './dto/atualizaColaboradorAdministrativo.dto';

import { v4 as uuid } from 'uuid';

@Controller('/colaborador/administrativo')
export class ColaboradorAdministrativoController {
  constructor(private colaborador: ColaboradorAdministrativoRepository) {}

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

      this.colaborador.criaColaborador(colaboradorEntity);
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
    const colaboradores = await this.colaborador.listaColaboradores();
    const colaboradoresLista = colaboradores.map(
      (colaborador) =>
        new ListaColaboradorAdministrativoDTO(colaborador.id, colaborador.nome),
    );
    return colaboradoresLista;
  }

  @Put('/:id')
  async atualizaColaborador(
    @Param('id') id: string,
    @Body() novosDados: AtualizaColaboradorAdministrativoDTO,
  ) {
    await this.colaborador.atualizaColaborador(id, novosDados);
    return {
      mensagem: 'Colaborador atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    const colaboradorDeletado = await this.colaborador.deletaColaborador(id);
    return {
      colaborador: colaboradorDeletado,
      mensagem: 'Colaborador deletado com sucesso!',
    };
  }
}
