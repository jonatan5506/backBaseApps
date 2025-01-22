import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColaboradorAdministrativoEntity } from './colaboradorAdministrativo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaColaboradorAdministrativoDTO } from './dto/listaColaboradorAdministrativo.dto';
import { AtualizaColaboradorAdministrativoDTO } from './dto/atualizaColaboradorAdministrativo.dto';

@Injectable()
export class ColaboradorAdministrativoService {
  constructor(
    @InjectRepository(ColaboradorAdministrativoEntity)
    private readonly colaboradorRepository: Repository<ColaboradorAdministrativoEntity>,
  ) {}

  async criaColaborador(colaboradorEntity: ColaboradorAdministrativoEntity) {
    await this.colaboradorRepository.save(colaboradorEntity);
  }

  async verificaEmail(email: string): Promise<boolean> {
    const emailValidado = await this.colaboradorRepository.findOne({
      where: { email },
    });
    return emailValidado !== null;
  }

  async verificaCpf(cpf: string): Promise<boolean> {
    const cpfValidado = await this.colaboradorRepository.findOne({
      where: { cpf },
    });
    return cpfValidado !== null;
  }

  async listaColaboradores() {
    try {
      const colaboradoresSalvos = await this.colaboradorRepository.find();
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

  async atualizaColaborador(
    id: string,
    colaboradorEntity: AtualizaColaboradorAdministrativoDTO,
  ) {
    try {
      const resultado = await this.colaboradorRepository.update(
        id,
        colaboradorEntity,
      );
      // Verifique se o resultado foi bem-sucedido, dependendo da implementação do `update`
      if (resultado.affected === 0) {
        throw new Error(
          'Colaborador não encontrado ou não foi possível atualizar',
        );
      }
      return resultado;
    } catch (error) {
      throw new Error('Erro ao atualizar colaborador: ' + error.message);
    }
  }

  async deletaColaborador(id: string) {
    await this.colaboradorRepository.delete(id);
  }
}
