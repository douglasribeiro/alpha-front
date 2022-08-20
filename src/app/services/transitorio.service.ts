import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class TransitorioService {
  enderecos: Endereco;
  
  constructor(http: HttpClient) { }
}
