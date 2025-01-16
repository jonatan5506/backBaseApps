import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

// Implementando validações no class-validator
@Injectable()
@ValidatorConstraint({ async: true }) // Função assíncrona
export class ValidadorDeCpf implements ValidatorConstraintInterface {
  async validate(cpfInput: string): Promise<boolean> {
    // Remover caracteres não numéricos do CPF
    const cpfLimpo = cpfInput.replace(/\D/g, '');

    // Validar se o CPF é válido usando a biblioteca cpf-cnpj-validator
    return cpf.isValid(cpfLimpo);
  }
}

// Criando o Decorator
export const CpfValidator = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: ValidadorDeCpf,
    });
  };
};
