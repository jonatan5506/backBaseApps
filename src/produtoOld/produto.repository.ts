import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutosRepository {
  private produtos: ProdutoEntity[] = [];

  async criaProdutos(produto: ProdutoEntity) {
    this.produtos.push(produto);
  }

  async listaProdutos() {
    return this.produtos;
  }

  private async buscaPorId(id: string) {
    const produto = this.produtos.find((produto) => produto.id === id);

    if (!produto) {
      throw new Error('Produto não encontrado!');
    }

    return produto;
  }

  async atualizaProduto(
    id: string,
    dadosDeAtualizacao: Partial<ProdutoEntity>,
  ) {
    const produto = await this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave !== 'id') {
        produto[chave] = valor;
      }
    });

    return produto;
  }

  async deletaProduto(id: string) {
    const produtoIndex = await this.produtos.findIndex(
      (user) => user.id === id,
    );

    if (produtoIndex === -1) {
      throw new Error('Usuário não encontrado!');
    }
    this.produtos.splice(produtoIndex, 1);
    return { message: `O usuário de ID:${id} foi deletado com sucesso!` };
  }
}
