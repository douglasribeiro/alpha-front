import { TipoEndereco } from './tipoEndereco';
import { Endereco } from "./endereco";
import { Proprietario } from "./proprietario";

export interface Imovel {

  id: any;
  nomProrpietario: String;
  matricula: String;
  complementoImovel: String;
  condominio: String;
  tipo: String;
  edificacao: String;
  servico: String;
  areaTotal: String;
  areaConstruida: String;
  banheiros: String;
  quartos: String;
  suites: String;
  comodos: String;
  vagas: String;
  observacao: String;
  fotos: String[];
  proprietario: Proprietario;
  logradouro: String;
  numero: String;
  complementoEndereco: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}
