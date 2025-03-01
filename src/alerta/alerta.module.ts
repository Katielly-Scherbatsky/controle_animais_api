import { Module } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { AlertaController } from './alerta.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlertaController],
  providers: [AlertaService, PrismaService],
})
export class AlertaModule { }
