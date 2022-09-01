import { Cidade } from "./cidade";
import { EstadoBR } from "./estadobr";
import { Inquilino } from "./inquilino";
import { TipoEndereco } from "./tipoEndereco";

export interface Endereco {
	id?: any;
	logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cep: string;
	tipoEndereco: TipoEndereco;
	inquilino: Inquilino;
	cidade: Cidade;
}