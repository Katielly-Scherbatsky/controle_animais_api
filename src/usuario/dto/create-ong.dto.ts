import { CreateUsuarioDto } from "./create-usuario.dto";

export class CreateOngDto {
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  urlImagemPerfil: string;

  usuario: CreateUsuarioDto;
}
