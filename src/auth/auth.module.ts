import { Module } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { PrismaService } from 'src/prisma.service';
import { HashService } from 'src/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'minha_chave_secreta',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService, PrismaService, HashService, JwtStrategy],
})
export class AuthModule { }
