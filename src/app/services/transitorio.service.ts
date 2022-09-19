import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Telefone } from '../components/telefone/telefone';
import { Endereco } from '../models/endereco';
import { Referencia } from '../models/referencia';

@Injectable({
  providedIn: 'root'
})
export class TransitorioService {
  enderecos: Endereco;
  telefones: Telefone;
  referencia: Referencia;
  
  constructor(http: HttpClient) { }
}
