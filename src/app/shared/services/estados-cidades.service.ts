import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getCidades(){
    return this.httpClient.get("assets/data/cidades.json").pipe(map((res: Response) => res.json()));
  }
}
