import { CaracteristicasProdutoDTO } from './dto/caracteristicasProduto.dto';
import { ImagensProdutoDTO } from './dto/imagensProduto.dto';

export class ProdutoEntity {
  id: string;
  nome: string;
  valor: number;
  quantidadeDisponivel: number;
  descricao: string;
  caracteristicas: CaracteristicasProdutoDTO[];
  imagens: ImagensProdutoDTO[];
  categoria: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
