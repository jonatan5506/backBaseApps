import { Injectable } from '@nestjs/common';
import { ColaboradorAdministrativoEntity } from './colaboradorAdministrativo.entity';

@Injectable()
export class ColaboradorAdministrativoRepository {
  private colaborador: ColaboradorAdministrativoEntity[] = [];
  id: string;
  nome: string;

  private async buscaPorId(id: string) {
    const colaborador = await this.colaborador.find((user) => user.id === id); // Encontrar o usuário diretamente

    if (!colaborador) {
      throw new Error('Colaborador não encontrado!');
    }

    return colaborador;
  }

  async verificaEmail(email: string) {
    const emailValidado = await this.colaborador.find(
      (user) => user.email === email,
    );
    return emailValidado !== undefined;
  }

  async criaColaborador(colaborador: ColaboradorAdministrativoEntity) {
    await this.colaborador.push(colaborador);
  }

  async listaColaboradores() {
    return await this.colaborador;
  }

  async atualizaColaborador(
    id: string,
    dadosDeAtualizacao: Partial<ColaboradorAdministrativoEntity>,
  ) {
    const colaborador = await this.buscaPorId(id); // Reutilizando a função buscaPorId

    // Forma correta de atualizar
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      // Ignorando a chave 'id' para não alterá-la
      if (chave !== 'id') {
        colaborador[chave] = valor;
      }
    });
    return colaborador;
  }

  async deletaColaborador(id: string) {
    const colaboradorDeletado = await this.colaborador.findIndex(
      (colab) => colab.id === id,
    );

    if (colaboradorDeletado === -1) {
      throw new Error('Colaborador não encontrado!');
    }

    await this.colaborador.splice(colaboradorDeletado, 1);
    return { mensagem: `O colaborador de ID: ${id} foi deletado com sucesso!` };
  }
}
