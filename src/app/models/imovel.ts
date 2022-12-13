import { Endereco } from "./endereco";
import { Proprietario } from "./proprietario";

export interface Imovel {

  id: any;
  endereco: Endereco;
  logradouro: String;
  numero: String;
  nomProrpietario: String;
  matricula: String;
  complemento: String;
  condominio: Boolean;
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
  prorietario: Proprietario;

}
