import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColaboradorAdministrativoEntity } from './colaboradorAdministrativo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaColaboradorAdministrativoDTO } from './dto/listaColaboradorAdministrativo.dto';

@Injectable()
export class ColaboradorAdministrativoService {
  constructor(
    @InjectRepository(ColaboradorAdministrativoEntity)
    private readonly colaboradorReposory: Repository<ColaboradorAdministrativoEntity>,
  ) {}

  async criaColaborador(colaboradorEntity: ColaboradorAdministrativoEntity) {
    await this.colaboradorReposory.save(colaboradorEntity);
  }

  async verificaEmail(email: string): Promise<boolean> {
    const emailValidado = await this.colaboradorReposory.findOne({
      where: { email },
    });
    return emailValidado !== null;
  }

  async listaColaboradores() {
    try {
      const colaboradoresSalvos = await this.colaboradorReposory.find();
      const listaColaboradores = colaboradoresSalvos.map(
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
