import { PerfilEnum } from "../enums/perfil.enum";

export class CreateUsuarioDto {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  urlImagemPerfil: string;
}
