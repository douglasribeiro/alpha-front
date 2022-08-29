import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { empty, map, switchMap, tap } from 'rxjs';
import { Cidade } from 'src/app/models/cidade';
import { Endereco } from 'src/app/models/endereco';
import { EstadoBR } from 'src/app/models/estadobr';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { EstadosCidadesService } from 'src/app/shared/services/estados-cidades.service';

@Component({
  selector: 'app-endereco-edit',
  templateUrl: './endereco-edit.component.html',
  styleUrls: ['./endereco-edit.component.css']
})
export class EnderecoEditComponent implements OnInit {

  endereco: Endereco;
  enderecoAnt: Endereco;
  estados: EstadoBR[];
  cidades: Cidade[];

  tipoEnderecos: EstadoCivil[] = [
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "COBRANCA", viewValue: "Cobrança"},
    {value: "ENTREGA", viewValue: "Entrega"},
    {value: "RECADO", viewValue: "Recado"},
    {value: "OUTROS", viewValue: "Outros"}
  ]

  logradouro:   FormControl = new FormControl(null);
  numero:       FormControl = new FormControl(null);
	complemento:  FormControl = new FormControl(null);
	bairro:       FormControl = new FormControl(null);
	cep:          FormControl = new FormControl(null);
	tipoEndereco: FormControl = new FormControl(null);
	inquilino:    FormControl = new FormControl(null);
  estado:       FormControl = new FormControl(null);
	cidade:       FormControl = new FormControl(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public estadoService: EstadosCidadesService,
    public transitorio: TransitorioService,
    public dialogRef: MatDialogRef<EnderecoEditComponent>
  ) { }

  ngOnInit(): void {
    this.endereco = this.data.OrderID;
    this.estadoService.getEstados().subscribe(x => {
      this.estados = x;

      this.estado.valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(est => this.estados.filter(e => e.sigla == est)),
        map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
        switchMap((estadoId: number) => this.estadoService.getCidades(estadoId)),
      )
      .subscribe(cidades => this.cidades = cidades);
    })
    
  }

  saida(){
    this.dialogRef.close({data: this.endereco});    
  }

  abort(){
    this.dialogRef.close();
  }


}