import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma.service';
import { PerfilEnum } from './enums/perfil.enum';
import { CreateOngDto } from './dto/create-ong.dto';
import { HashService } from 'src/hash.service';

@Injectable()
export class UsuarioService {

  constructor(private prisma: PrismaService,
    private readonly hashService: HashService
  ) { }

  async criar(dto: CreateUsuarioDto) {
    var usuarioPorEmail = await this.prisma.usuario.findFirst({
      where: {
        email: dto.email
      }
    });

    if (usuarioPorEmail) {
      throw new Error("O e-mail informado já esta em uso.");
    }

    const hashedPassword = await this.hashService.hashPassword(dto.senha);

    return this.prisma.usuario.create({
      data: {
        ...dto,
        senha: hashedPassword,
        perfil: PerfilEnum.Ong
      }
    });
  }

  async criarOng(dto: CreateOngDto) {
    var usuarioPorEmail = await this.prisma.usuario.findFirst({
      where: {
        email: dto.usuario.email
      }
    });

    if (usuarioPorEmail) {
      throw new Error("O e-mail informado já esta em uso.");
    }

    const hashedPassword = await this.hashService.hashPassword(dto.usuario.senha);

    const usuario = await this.prisma.usuario.create({
      data: {
        ...dto.usuario,
        senha: hashedPassword,
        perfil: PerfilEnum.Ong
      }
    });

    this.prisma.ong.create({
      data: {
        nome: dto.nome,
        cnpj: dto.cnpj,
        endereco: dto.endereco,
        telefone: dto.telefone,
        urlImagemPerfil: dto.urlImagemPerfil,
        usuarioId: usuario.id
      }
    });

    return usuario;
  }

  buscar(id: number) {
    return this.prisma.usuario.findFirst({
      where: {
        id
      }
    });
  }

  async buscarPorEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  atualizar(id: number, dto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      data: {
        ...dto
      },
      where: {
        id,
      },
    });
  }
}
