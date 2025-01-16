import {
  //IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AtualizaColaboradorAdministrativoDTO {
  @IsString({ message: 'O nome deve ser do tipo string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 4 caracteres' })
  @IsOptional() //Todos são opcionais
  nome: string;

  @IsString({ message: 'O cpf deve ser do tipo string' })
  @IsNotEmpty({ message: 'O cpf não pode ser vazio' })
  @MinLength(4, { message: 'O cpf deve ter no mínimo 4 caracteres' })
  @IsOptional() //Todos são opcionais
  cpf: string;

  @IsString({ message: 'O celular deve ser do tipo string' })
  @IsNotEmpty({ message: 'O celular não pode ser vazio' })
  @IsOptional() //Todos são opcionais
  celular?: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  // TODO @EmailValidator({ message: 'O e-mail já está cadastrado' })
  @IsOptional() //Todos são opcionais
  email?: string;

  // TODO @IsDate({ message: 'A data de nascimento deve ser do tipo Date' })
  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazio' })
  @IsOptional() //Todos são opcionais
  dataDeNascimento?: Date;

  @IsString({ message: 'A imagem deve ser do tipo string' })
  @IsOptional() //Todos são opcionais
  imagem?: string;
}
