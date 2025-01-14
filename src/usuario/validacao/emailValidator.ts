import {
  ValidatorConstraintInterface,
  //ValidationArguments,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';
import { Injectable } from '@nestjs/common';

//implemetando validações no class-validator
@Injectable()
@ValidatorConstraint({ async: true }) //Função assincrona
export class ValidadorDeEmail implements ValidatorConstraintInterface {
  constructor(private repository: UsuarioRepository) {}

  async validate(email: string): Promise<boolean> {
    try {
      const emailValidado = await this.repository.verificaEmail(email);
      return !emailValidado;
    } catch (error) {
      throw new Error(`Erro ao validar email: ${error}`);
    }
  }
}

//Criando Decorator
export const EmailValidator = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: ValidadorDeEmail,
    });
  };
};
