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

  getSimNao(){
    return [
      {value: 1, viewValue: 'Sim'},
      {value: 0, viewValue: 'Não'}
    ]
  }

  getPessoas(){
    return [
      {valor: "FISICO", descr: "Fisico"},
      {valor: "JURIDICO", descr: "Juridico"}
    ]
  }

  getTipoServico(){
    return [
      {value: 'ALUGUEL', viewValue: 'Aluguel'},
      {value: 'VENDA', viewValue: 'Venda'},
      {value: 'OUTROS', viewValue: 'Outros'}
    ]
  }

  getTipoEdificacao() {
    return [
      {value: 'CASA', viewValue: 'Casa'},
      {value: 'APARTAMENTO', viewValue: 'Apartamento'},
      {value: 'GALPAO', viewValue: 'Galpão'},
      {value: 'TERRENO', viewValue: 'Terreno'},
      {value: 'OUTROS', viewValue: 'Outros'}
    ]
  }

  getTipoImovel() {
    return [
      {value: 'RESIDENCIAL', viewValue: 'Residencial'},
      {value: 'COMERCIAL', viewValue: 'Comercial'},
      {value: 'INDUSTRIAL', viewValue: 'Industrial'},
      {value: 'RURAL', viewValue: 'Rural'},
      {value: 'OUTROS', viewValue: 'Outros'}
    ]
  }

  getEstCivis() {
    return [
      {value: 'SOLTEIRO', viewValue: 'Solteiro'},
      {value: 'CASADO', viewValue: 'Casado'},
      {value: 'AMAZIADO', viewValue: 'Amaziado'},
      {value: 'VIUVO', viewValue: 'Viuvo'}
    ]
  }

  getEstadosBr(){
    return this.http.get<EstadoBR[]>('assets/data/estados.json')
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/data/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado.id == idEstado))
    )
  }
}
