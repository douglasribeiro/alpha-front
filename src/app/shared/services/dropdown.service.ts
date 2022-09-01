import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Cidade } from 'src/app/models/cidade';
import { EstadoBR } from 'src/app/models/estadobr';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getPessoas(){
    return [
      {valor: "FISICO", descr: "Fisico"},
      {valor: "JURIDICO", descr: "Juridico"}
    ]
  }

  getEstadosBr(){
    return this.http.get<EstadoBR[]>('assets/data/estados.json')
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/data/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    )
  }
}
