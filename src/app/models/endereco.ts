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
	cidade: string;
	estado: string;
}