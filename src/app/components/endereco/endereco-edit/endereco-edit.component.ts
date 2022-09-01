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
  //estados: EstadoBR[];
  cidades: Cidade[];

  tipoEnderecos: EstadoCivil[] = [
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "COBRANCA", viewValue: "Cobrança"},
    {value: "ENTREGA", viewValue: "Entrega"},
    {value: "RECADO", viewValue: "Recado"},
    {value: "OUTROS", viewValue: "Outros"}
  ]

estados: EstadoBR[] = [
  {id: "1", sigla: "AC", nome: "Acre"},
  {id: "2", sigla: "AL", nome: "Alagoas"},
  {id: "3", sigla: "AM", nome: "Amazonas"},
  {id: "4", sigla: "AP", nome: "Amapá"},
  {id: "5", sigla: "BA", nome: "Bahia"},
  {id: "6", sigla: "CE", nome: "Ceará"},
  {id: "7", sigla: "DF", nome: "Distrito Federal"},
  {id: "8", sigla: "ES", nome: "Espírito Santo"},
  {id: "9", sigla: "GO", nome: "Goiás"},
  {id: "10", sigla: "MA", nome: "Maranhão"},
  {id: "11", sigla: "MG", nome: "Minas Gerais"},
  {id: "12", sigla: "MS", nome: "Mato Grosso do Sul"},
  {id: "13", sigla: "MT", nome: "Mato Grosso"},
  {id: "14", sigla: "PA", nome: "Pará"},
  {id: "15", sigla: "PB", nome: "Paraíba"},
  {id: "16", sigla: "PE", nome: "Pernambuco"},
  {id: "17", sigla: "PI", nome: "Piauí"},
  {id: "18", sigla: "PR", nome: "Paraná"},
  {id: "19", sigla: "RJ", nome: "Rio de Janeiro"},
  {id: "20", sigla: "RN", nome: "Rio Grande do Norte"},
  {id: "21", sigla: "RO", nome: "Rondônia"},
  {id: "22", sigla: "RR", nome: "Roraima"},
  {id: "23", sigla: "RS", nome: "Rio Grande do Sul"},
  {id: "24", sigla: "SC", nome: "Santa Catarina"},
  {id: "25", sigla: "SE", nome: "Sergipe"},
  {id: "26", sigla: "SP", nome: "São Paulo"},
  {id: "27", sigla: "TO", nome: "Tocantins"
  }
]

  logradouro:   FormControl = new FormControl(null);
  numero:       FormControl = new FormControl(null);
	complemento:  FormControl = new FormControl(null);
	bairro:       FormControl = new FormControl(null);
	cep:          FormControl = new FormControl(null);
	tipoEndereco: FormControl = new FormControl(null);
	inquilino:    FormControl = new FormControl(null);
  //estado:       FormControl = new FormControl(null);
	cidade:       FormControl = new FormControl(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public estadoService: EstadosCidadesService,
    public transitorio: TransitorioService,
    public dialogRef: MatDialogRef<EnderecoEditComponent>
  ) { }

  ngOnInit(): void {
    this.endereco = this.data.OrderID;
    console.log(this.endereco)
    //this.estadoService.getEstados().subscribe(x => {
    //  this.estados = x;

      //this.estado.valueChanges
      //.pipe(
      //  tap(estado => console.log('Novo estado: ', estado)),
      //  map(est => this.estados.filter(e => e.id == est)),
      //  map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
      //  switchMap((estadoId: number) => this.estadoService.getCidades(estadoId)),
      //)
      //.subscribe();
      //.subscribe(cidades => this.cidades = cidades);
    //})  
  }

  saida(){
    this.dialogRef.close({data: this.endereco});    
  }

  abort(){
    console.log(this.endereco)
    this.dialogRef.close();
  }


}
