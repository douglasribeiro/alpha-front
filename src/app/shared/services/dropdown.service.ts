import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }

  getPessoas(){
    return [
      {valor: "FISICO", descr: "Fisico"},
      {valor: "JURIDICO", descr: "Juridico"}
    ]
  }
}
