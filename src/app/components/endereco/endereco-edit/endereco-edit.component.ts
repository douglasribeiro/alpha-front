import { EmptyExpr } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { empty, map, pipe, switchMap, tap } from 'rxjs';
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
  cidades: Cidade[] = [];
  form: FormGroup;

  tipoEnderecos: EstadoCivil[] = [
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "COBRANCA", viewValue: "Cobrança"},
    {value: "ENTREGA", viewValue: "Entrega"},
    {value: "RECADO", viewValue: "Recado"},
    {value: "OUTROS", viewValue: "Outros"}
  ]
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public estadoService: EstadosCidadesService,
    public transitorio: TransitorioService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnderecoEditComponent>
  ) { }

  ngOnInit(): void {
    this.endereco = this.data.OrderID;
    this.form = this.formBuilder.group({
      logradouro:   [this.endereco.logradouro],
      numero:       [this.endereco.numero],
	    complemento:  [this.endereco.complemento],
	    bairro:       [this.endereco.bairro],
	    cep:          [this.endereco.cep],
	    tipoEndereco: [this.endereco.tipoEndereco],
	    cidade: this.formBuilder.group({
        id: [this.endereco.cidade.id],
        nome: [this.endereco.cidade.nome],
        estado: this.formBuilder.group({
          id: [this.endereco.cidade.estado.id],
          sigla: [this.endereco.cidade.estado.sigla],
          nome: [this.endereco.cidade.estado.nome]
        })
      })
    })
    
    this.estadoService.getEstados().subscribe(est => this.estados = est)
    this.form.get('cidade.estado.sigla').valueChanges
      .pipe(
        tap(sigla => console.log('Novo estado.: ', sigla)),
        switchMap((estadoId: number) => this.estadoService.getCidades(estadoId)),
      )
      .subscribe(cidades => this.cidades = cidades);
  }

  saida(){
    this.dialogRef.close({data: this.endereco});    
  }

  abort(){
    console.log(this.endereco)
    this.dialogRef.close();
  }

  

}
