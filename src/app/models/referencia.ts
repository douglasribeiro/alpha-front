import { Inquilino } from "./inquilino";

export interface Referencia {
    
    id: number;
	nome: string;
	email: string;
    phone01: string;
	phone02: string;
	observacao: string;
    inquilino: Inquilino;
}