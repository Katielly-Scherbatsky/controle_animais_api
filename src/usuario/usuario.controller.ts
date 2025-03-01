import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateOngDto } from './dto/create-ong.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  usuarioId: number = 0;

  @Post()
  criarUsuario(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.criar(dto,);
  }

  @Post('ong')
  criarOng(@Body() dto: CreateOngDto) {
    return this.usuarioService.criarOng(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.usuarioService.buscar(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.atualizar(+id, dto);
  }
}
