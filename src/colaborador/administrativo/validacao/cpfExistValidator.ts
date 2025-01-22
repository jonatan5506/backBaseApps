import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ColaboradorAdministrativoService } from '../colaboradorAdministrativoService';

// Implementando validações no class-validator
@Injectable()
@ValidatorConstraint({ async: true }) // Função assíncrona
export class BuscadorDeCpf implements ValidatorConstraintInterface {
  constructor(private repository: ColaboradorAdministrativoService) {}

  async validate(cpf: string): Promise<boolean> {
    try {
      const cpfValidado = await this.repository.verificaCpf(cpf);
      return !cpfValidado;
    } catch (error) {
      throw new Error(`Erro ao validar cpf: ${error}`);
    }
  }
}

// Criando o Decorator
export const CpfExistValidator = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: BuscadorDeCpf,
    });
  };
};
