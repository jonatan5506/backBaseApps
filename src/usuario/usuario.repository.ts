import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable() //Tranforma em um provider para Infeção de Dependencias
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  async criaUsuario(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listaUsuarios() {
    return this.usuarios;
  }

  async verificaEmail(email: string) {
    const emailValidado = await this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return emailValidado !== undefined;
  }

  private async buscaPorId(id: string) {
    const usuario = this.usuarios.find((user) => user.id === id); // Encontrar o usuário diretamente

    if (!usuario) {
      throw new Error('Usuário não encontrado!');
    }

    return usuario;
  }

  async atualizaUsuario(
    id: string,
    dadosDeAtualizacao: Partial<UsuarioEntity>,
  ) {
    const usuario = await this.buscaPorId(id); // Reutilizando a função buscaPorId

    // Forma correta de atualizar
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      // Ignorando a chave 'id' para não alterá-la
      if (chave !== 'id') {
        usuario[chave] = valor;
      }
    });
    return usuario;
  }

  async deletaUsuario(id: string) {
    const usuarioIndex = await this.usuarios.findIndex(
      (user) => user.id === id,
    );

    if (usuarioIndex === -1) {
      throw new Error('Usuário não encontrado!');
    }
    await this.usuarios.splice(usuarioIndex, 1);
    return { message: `O usuário de ID:${id} foi deletado com sucesso!` };
  }
}
