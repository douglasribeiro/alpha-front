import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
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
    return this.htpp.put<Inquilino>(`${API_CONFIG.baseUrl}/inquilino/${inquilino.id}`, inquilino);
  }

  delete(id: any): Observable<Inquilino> {
    return this.htpp.delete<Inquilino>(`${API_CONFIG.baseUrl}/inquilino/${id}`);
  }
}
