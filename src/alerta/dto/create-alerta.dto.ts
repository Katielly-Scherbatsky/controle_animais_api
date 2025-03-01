import { EspecieEnum } from "../enums/especie.enum";

export class CreateAlertaDto {
  latitude: number;
  longitude: number;
  dataEncontro: Date;
  especie: EspecieEnum;
  Observacao?: string;
  urlImagemRegistro: string;
}
