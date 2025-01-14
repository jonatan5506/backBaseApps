import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';

import { v4 as uuid } from 'uuid';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.nome = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    this.usuarioRepository.criaUsuario(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuarios = await this.usuarioRepository.listaUsuarios();
    const usuariosLista = usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualizaUsuario(
      id,
      novosDados,
    );
    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletaUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioRepository.deletaUsuario(id);
    return {
      usuario: usuarioDeletado,
      mensagem: 'Usuário deletado com sucesso!',
    };
  }
}
