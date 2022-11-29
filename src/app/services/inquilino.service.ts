import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Cep } from '../models/cep';
import { Inquilino } from '../models/inquilino';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  constructor(private htpp: HttpClient) { }

  findbyId(id: any): Observable<Inquilino> {
    return this.htpp.get<Inquilino>(`${API_CONFIG.baseUrl}/inquilino/${id}`) 
  }

  findAll(): Observable<Inquilino[]> {
    return this.htpp.get<Inquilino[]>(`${API_CONFIG.baseUrl}/inquilino`)
  }

  create(inquilino: Inquilino): Observable<Inquilino> {
    return this.htpp.post<Inquilino>(`${API_CONFIG.baseUrl}/inquilino`, inquilino);
  }

  update(inquilino: Inquilino): Observable<Inquilino> {
    return this.htpp.patch<Inquilino>(`${API_CONFIG.baseUrl}/inquilino/${inquilino.id}`, inquilino);
  }

  exclui(id: any): Observable<Inquilino> {
    console.log("Delete.: ", id);
    console.log(`${API_CONFIG.baseUrl}/inquilino/${id}`)
    return this.htpp.delete<Inquilino>(`${API_CONFIG.baseUrl}/inquilino/${id}`) 
  }

  buscaCep(cep: string): Observable<Cep>{
    return this.htpp.get<Cep>(`${API_CONFIG.baseUrl}/cep/${cep}`);
  }
}
