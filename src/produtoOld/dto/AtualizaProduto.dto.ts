import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
  Matches,
  IsPositive,
  MaxLength,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { CaracteristicasProdutoDTO } from './caracteristicasProduto.dto';
import { ImagensProdutoDTO } from './imagensProduto.dto';
import { Type } from 'class-transformer';

export class atualizaProdutoDTO {
  @IsString({ message: 'O nome deve ser do tipo string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 4 caracteres' })
  @IsOptional()
  nome: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O valor não pode ser vazio' })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'O valor deve ter no máximo duas casas decimais',
  })
  @IsOptional()
  valor: number;

  @IsNumber()
  @IsPositive({ message: 'A quantidade deve ser maior que zero' })
  @IsNotEmpty({ message: 'A quantidade não pode ser vazia' })
  @IsOptional()
  quantidadeDisponivel: number;

  @IsString({ message: 'A descrição deve ser do tipo string' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MaxLength(1001, { message: 'A descrição pode ter até 1000 caracteres' })
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => CaracteristicasProdutoDTO)
  @IsNotEmpty({ message: 'As características não podem ser vazias' })
  @IsOptional()
  caracteristicas: CaracteristicasProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagensProdutoDTO)
  @IsNotEmpty({ message: 'As imagens não podem ser vazias' })
  @IsOptional()
  imagens: ImagensProdutoDTO[];

  @IsString({ message: 'A categoria deve ser do tipo string' })
  @IsNotEmpty({ message: 'A categoria não pode ser vazia' })
  @MinLength(4, { message: 'A categoria deve ter no mínimo 4 caracteres' })
  @IsOptional()
  categoria: string;

  @IsDate()
  @IsNotEmpty({ message: 'A data da criação não pode ser vazia' })
  @IsOptional()
  dataCriacao: Date;

  @IsDate()
  @IsOptional()
  dataAtualizacao: Date;
}
