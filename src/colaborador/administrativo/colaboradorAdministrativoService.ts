import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColaboradorAdministrativoEntity } from './colaboradorAdministrativo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaColaboradorAdministrativoDTO } from './dto/listaColaboradorAdministrativo.dto';

@Injectable()
export class ColaboradorAdministrativoService {
  constructor(
    @InjectRepository(ColaboradorAdministrativoEntity)
    private readonly usuarioReposory: Repository<ColaboradorAdministrativoEntity>,
  ) {}

  async criaColaborador() {}

  async listaColaboradores() {
    try {
      const usuariosSalvos = await this.usuarioReposory.find();
      const listaColaboradores = usuariosSalvos.map(
        (usuario) =>
          new ListaColaboradorAdministrativoDTO(usuario.id, usuario.nome),
      );
      return listaColaboradores;
    } catch (error) {
      // Aqui você pode logar o erro se necessário
      console.error('Erro ao listar colaboradores:', error);
      // Lançar uma exceção adequada
      throw new InternalServerErrorException(
        'Erro ao consultar colaboradores no banco de dados',
      );
    }
  }
}
