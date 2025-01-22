import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
//import { ColaboradorAdministrativoRepository } from '../colaboradorAdministrativo.repository';
import { ColaboradorAdministrativoService } from '../colaboradorAdministrativoService';

//implemetando validações no class-validator
@Injectable()
@ValidatorConstraint({ async: true }) //Função assincrona
export class ValidadorDeEmail implements ValidatorConstraintInterface {
  //constructor(private repository: ColaboradorAdministrativoRepository) {}
  constructor(private repository: ColaboradorAdministrativoService) {}

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
