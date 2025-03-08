import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthUser } from "src/auth/contracts/auth-user";
import { CurrentUser } from "src/core/decorators/current-user.decorator";
import { AlertaService } from "./alerta.service";
import { CreateAlertaDto } from "./dto/create-alerta.dto";
import { CreateDenunciaDto } from "./dto/create-denuncia-alerta.dto";
import { UpdateAlertaDto } from "./dto/update-alerta.dto";

@Controller("alerta")
export class AlertaController {
  constructor(private readonly alertaService: AlertaService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@CurrentUser() usuario: AuthUser, @Body() dto: CreateAlertaDto) {
    return this.alertaService.criar(usuario.id, dto);
  }

  @Get()
  buscarTodos() {
    return this.alertaService.buscarTodos();
  }

  @Get(":id")
  buscar(@Param("id", ParseIntPipe) id: number) {
    return this.alertaService.buscar(+id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  atualizar(
    @CurrentUser() usuario: AuthUser,
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateAlertaDto
  ) {
    return this.alertaService.atualizar(+id, usuario.id, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":id/atualizar-status/:status")
  atualizarStatus(
    @CurrentUser() usuario: AuthUser,
    @Param("id", ParseIntPipe) id: number,
    @Param("status", ParseIntPipe) status: number
  ) {
    return this.alertaService.atualizarStatus(+id, usuario.id, status);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  remover(@CurrentUser() usuario: AuthUser, @Param("id") id: number) {
    return this.alertaService.remover(+id, usuario.id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":id/denunciar")
  denunciarAlerta(
    @CurrentUser() usuario: AuthUser,
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateDenunciaDto
  ) {
    return this.alertaService.denunciarAlerta(usuario.id, +id, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("usuario/:usuarioId")
  buscarAvisosDoUsuario(@Param("usuarioId", ParseIntPipe) usuarioId: number) {
    return this.alertaService.buscarAvisosDoUsuario(usuarioId);
  }
}
