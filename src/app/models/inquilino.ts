import { Endereco } from "./endereco";

export interface Inquilino {
    id: any;
	nome: string;
	pessoa: string;
    cpfcnpj: string;
	identinscr: string;
	email: string;
	dtNiver: any;
	estCivil: string;
	sexo: string;
	ativo: boolean;
	nacional: string;
	naturalidade: string;
	telefones: String[];
	enderecos: Endereco[];

}