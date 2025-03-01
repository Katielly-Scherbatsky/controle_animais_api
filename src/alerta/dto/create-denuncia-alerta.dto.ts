import { EspecieEnum } from "../enums/especie.enum";
import { MotivoDenunciaEnum } from "../enums/motivo-denuncia.enum";

export class CreateDenunciaDto {
  motivo: MotivoDenunciaEnum;
  Observacao?: string;
}
