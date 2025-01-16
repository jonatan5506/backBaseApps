import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { EmailValidator } from '../validacao/emailValidator';
import { CpfValidator } from '../validacao/cpfValidator';
import { Type } from 'class-transformer';

export class CriaColaboradorAdministrativoDTO {
  @IsString({ message: 'O nome deve ser do tipo string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 4 caracteres' })
  nome: string;

  @IsString({ message: 'O cpf deve ser do tipo string' })
  @IsNotEmpty({ message: 'O cpf não pode ser vazio' })
  @Length(11, 11, { message: 'O cpf deve ter exatamente 11 caracteres' })
  @CpfValidator({ message: 'O cpf não é válido' })
  cpf: string;

  @IsString({ message: 'O celular deve ser do tipo string' })
  @IsNotEmpty({ message: 'O celular não pode ser vazio' })
  celular: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  @EmailValidator({ message: 'O e-mail já está cadastrado' })
  email: string;

  // @Type transforma para o tipo Date
  @IsDate({ message: 'A data de nascimento deve ser do tipo Date' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazio' })
  dataDeNascimento: Date;

  @IsString({ message: 'A imagem deve ser do tipo string' })
  imagem: string;
}
