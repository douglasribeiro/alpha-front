import { TipoTelefone } from "src/app/models/tipoTelefone";

export interface Telefone {

    id: number,
    ddd: string,
    numero: string,
    tipo: TipoTelefone,
}
