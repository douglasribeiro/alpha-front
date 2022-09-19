import { Telefone } from "../components/telefone/telefone";
import { Endereco } from "./endereco";
import { Referencia } from "./referencia";

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
	telefones: Telefone[];
	enderecos: Endereco[];
	referencia: Referencia[];

}