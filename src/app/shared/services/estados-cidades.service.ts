import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG } from 'src/app/config/api.config';
import { Cep } from 'src/app/models/cep';
import { Cidade } from 'src/app/models/cidade';
import { EstadoBR } from 'src/app/models/estadobr';

@Injectable({
  providedIn: 'root'
})
export class EstadosCidadesService {
 
  constructor(private httpClient: HttpClient) { }

  getEstados() : Observable<EstadoBR[]> {
    return this.httpClient.get<EstadoBR[]>("assets/data/estados.json");
    // return this.htpp.get<Inquilino>(`${API_CONFIG.baseUrl}/inquilino/${id}`) 
  }

  getCidades(idEstado: number): Observable<Cidade[]>{
    return this.httpClient.get<Cidade[]>(`${API_CONFIG.baseUrl}/cidade/`+idEstado)
    //return this.httpClient.get<Cidade[]>("assets/data/cidades.json")
    //.pipe(map((cidades: Cidade[]) => cidades.filter(c => c.estado.id == idEstado)));
  }

  consultaCEP(cep: string): Observable<Cep> {
    
    console.log('consulta de cep.: ' ,cep);

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.httpClient.get<Cep>(`${API_CONFIG.baseUrl}/cep/`+cep);
      }
    }

    return null;
  }

}
