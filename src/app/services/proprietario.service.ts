import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Cep } from '../models/cep';
import { Proprietario } from '../models/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  constructor(private htpp: HttpClient) { }

  findbyId(id: any): Observable<Proprietario> {
    return this.htpp.get<Proprietario>(`${API_CONFIG.baseUrl}/proprietario/${id}`)
  }

  findGenerics(nomeEmail: String){
    return this.htpp.get<Proprietario>(`${API_CONFIG.baseUrl}/proprietario/nome/${nomeEmail}`)
  }

  findAll(): Observable<Proprietario[]> {
    return this.htpp.get<Proprietario[]>(`${API_CONFIG.baseUrl}/proprietario`)
  }

  create(proprietario: Proprietario): Observable<Proprietario> {
    return this.htpp.post<Proprietario>(`${API_CONFIG.baseUrl}/proprietario`, proprietario);
  }

  update(proprietario: Proprietario): Observable<Proprietario> {
    return this.htpp.patch<Proprietario>(`${API_CONFIG.baseUrl}/proprietario/${proprietario.id}`, proprietario);
  }

  exclui(id: any): Observable<Proprietario> {
    return this.htpp.delete<Proprietario>(`${API_CONFIG.baseUrl}/proprietario/${id}`)
  }

  buscaCep(cep: string): Observable<Cep>{
    return this.htpp.get<Cep>(`${API_CONFIG.baseUrl}/cep/${cep}`);
  }
}
