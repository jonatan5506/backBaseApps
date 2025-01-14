import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
//import { EmailValidator } from '../validacao/emailValidator';

export class CriaUsuarioDTO {
  @IsString({ message: 'O nome deve ser do tipo string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 4 caracteres' })
  nome: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  //@EmailValidator({ message: 'O e-mail já está cadastrado' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @Matches(/(?=.*[0-9])/, {
    message: 'A senha deve conter pelo menos um número',
  })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: 'A senha deve conter pelo menos um caractere especial',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula',
  })
  senha: string;
}
