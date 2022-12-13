import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";
import { Imovel } from "../models/imovel";

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  constructor(private htpp: HttpClient) { }

  findbyId(id: any): Observable<Imovel> {
    return this.htpp.get<Imovel>(`${API_CONFIG.baseUrl}/imovel/${id}`)
  }

  findAll(): Observable<Imovel[]> {
    return this.htpp.get<Imovel[]>(`${API_CONFIG.baseUrl}/imovel`)
  }

  save(imovel: Imovel): Observable<Imovel>{
    console.log("imovel..: ",imovel);
    return this.htpp.post<Imovel>(`${API_CONFIG.baseUrl}/imovel`, imovel);
  }

}
