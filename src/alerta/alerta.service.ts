import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { PrismaService } from 'src/prisma.service';
import { StatusEnum } from './enums/status.enum';
import { CreateDenunciaDto } from './dto/create-denuncia-alerta.dto';

@Injectable()
export class AlertaService {

  constructor(private prisma: PrismaService) { }

  criar(usuarioId: number, dto: CreateAlertaDto) {
    return this.prisma.alerta.create({
      data: {
        ...dto,
        usuarioId,
        status: StatusEnum.Avistado
      }
    });
  }

  buscarTodos() {
    return this.prisma.alerta.findMany();
  }

  buscar(id: number) {
    return this.prisma.alerta.findFirst({
      where: {
        id
      }
    });
  }

  async atualizar(id: number, usuarioId: number, dto: UpdateAlertaDto) {
    const alerta = await this.prisma.alerta.findFirst({
      where: {
        id,
      }
    });

    if (!alerta) {
      throw new NotFoundException();
    }

    if (alerta.usuarioId !== usuarioId) {
      throw new ForbiddenException();
    }

    return this.prisma.alerta.update({
      data: {
        ...dto
      },
      where: {
        id,
        AND: {
          usuarioId
        }
      },
    });
  }

  async atualizarStatus(id: number, usuarioId: number, status: StatusEnum) {
    const alerta = await this.prisma.alerta.findFirst({
      where: {
        id,
      }
    });

    if (!alerta) {
      throw new NotFoundException();
    }

    return this.prisma.alerta.update({
      data: {
        status
      },
      where: {
        id,
        AND: {
          usuarioId
        }
      },
    });
  }

  async remover(id: number, usuarioId: number) {
    const alerta = await this.prisma.alerta.findFirst({
      where: {
        id,
      }
    });

    if (!alerta) {
      throw new NotFoundException();
    }

    if (alerta.usuarioId !== usuarioId) {
      throw new ForbiddenException();
    }

    return this.prisma.alerta.delete({
      where: {
        id,
        AND: {
          usuarioId
        }
      }
    });
  }

  async denunciarAlerta(usuarioId: number, alertaId: number, dto: CreateDenunciaDto) {
    const alerta = await this.prisma.alerta.findFirst({
      where: {
        id: alertaId,
      }
    });

    if (!alerta) {
      throw new NotFoundException();
    }

    return this.prisma.denuncia.create({
      data: {
        ...dto,
        usuarioId,
        alertaId,
      }
    });
  }
}
