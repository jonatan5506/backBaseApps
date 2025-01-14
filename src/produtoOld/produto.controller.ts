import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutosRepository } from './produto.repository';
import { atualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { criarProdutoDTO } from './dto/criarProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ListagemProdutosDTO } from './dto/listagemProdutos.dto';

import { v4 as uuid } from 'uuid';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosRepository: ProdutosRepository) {}

  // TODO refazer
  @Post()
  async criaProduto(@Body() dadosDoProduto: criarProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.nome = dadosDoProduto.nome;
    produtoEntity.valor = dadosDoProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosDoProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosDoProduto.descricao;
    produtoEntity.imagens = dadosDoProduto.imagens;
    produtoEntity.caracteristicas = dadosDoProduto.caracteristicas;
    produtoEntity.dataCriacao = dadosDoProduto.dataCriacao;
    produtoEntity.dataAtualizacao = dadosDoProduto.dataAtualizacao;
    produtoEntity.id = uuid();

    await this.produtosRepository.criaProdutos(produtoEntity);
    return {
      usuario: new ListagemProdutosDTO(produtoEntity.id, produtoEntity.nome),
      messagem: 'Produto criado com sucesso!',
    };
  }

  @Get()
  async listaProdutos() {
    return this.produtosRepository.listaProdutos();
  }

  @Put('/:id')
  async atualizaProduto(
    @Param() id: string,
    @Body() novosDados: atualizaProdutoDTO,
  ) {
    const produtoAtualizado = await this.produtosRepository.atualizaProduto(
      id,
      novosDados,
    );
    return {
      produto: produtoAtualizado,
      menssagem: 'Produto atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletaProduto(@Param('id') id: string) {
    const produtoDeletado = await this.produtosRepository.deletaProduto(id);
    return {
      produto: produtoDeletado,
      mensagem: 'Produto deletado com sucesso!',
    };
  }
}
