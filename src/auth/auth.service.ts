import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "src/hash.service";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService
  ) {}

  async validarUsuario(email: string, senha: string) {
    const usuario = await this.usuarioService.buscarPorEmail(email);
    if (!usuario) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const senhaValida = await this.hashService.comparePasswords(
      senha,
      usuario.senha
    );
    if (!senhaValida) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return usuario;
  }

  async login(email: string, senha: string) {
    const usuario = await this.validarUsuario(email, senha);
    const payload = {
      id: usuario.id,
      email: usuario.email,
      perfil: usuario.perfil,
    };
    return {
      access_token: this.jwtService.sign(payload),
      usuarioId: usuario.id,
    };
  }
}
