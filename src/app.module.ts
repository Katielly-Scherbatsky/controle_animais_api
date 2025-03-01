import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AlertaModule } from './alerta/alerta.module';
import { PrismaService } from './prisma.service';
import { HashService } from './hash.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsuarioModule, AlertaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, HashService],
})
export class AppModule { }
