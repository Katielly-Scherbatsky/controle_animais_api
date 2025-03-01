import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto {
  nome: string;
  telefone: string;
  urlImagemPerfil: string;
}
