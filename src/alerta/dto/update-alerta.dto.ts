import { EspecieEnum } from '../enums/especie.enum';

export class UpdateAlertaDto {
  latitude: number;
  longitude: number;
  dataEncontro: Date;
  especie: EspecieEnum;
  Observacao?: string;
  urlImagemRegistro: string;
}
