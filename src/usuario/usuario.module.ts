import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma.service';
import { HashService } from 'src/hash.service';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, HashService],
})
export class UsuarioModule { }
