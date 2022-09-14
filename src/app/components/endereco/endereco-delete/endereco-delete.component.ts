import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { distinctUntilChanged, switchMap, empty } from 'rxjs';
import { Cep } from 'src/app/models/cep';
import { Cidade } from 'src/app/models/cidade';
import { Endereco } from 'src/app/models/endereco';
import { EstadoBR } from 'src/app/models/estadobr';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { FormValidation } from 'src/app/shared/form-validations';
import { EstadosCidadesService } from 'src/app/shared/services/estados-cidades.service';
import { EnderecoEditComponent } from '../endereco-edit/endereco-edit.component';

@Component({
  selector: 'app-endereco-delete',
  templateUrl: './endereco-delete.component.html',
  styleUrls: ['../endereco.component.css']
})
export class EnderecoDeleteComponent implements OnInit {
  endereco: Endereco;
  idCidadeAnt: any;
  form: FormGroup;
  
  cepValidator: any | string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public estadoService: EstadosCidadesService,
    public transitorio: TransitorioService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnderecoEditComponent>
  ) {
    
   }

  ngOnInit(): void {
    this.endereco = this.data.OrderID;
    this.idCidadeAnt = this.endereco.cidade.id;
    this.form = this.formBuilder.group({
      id:           [this.endereco.id],
      logradouro:   [this.endereco.logradouro],
      numero:       [this.endereco.numero],
	    complemento:  [this.endereco.complemento],
	    bairro:       [this.endereco.bairro],
	    cep:          [this.endereco.cep,[Validators.required, FormValidation.cepValidator]],
	    tipoEndereco: [this.endereco.tipoEndereco],
	    cidade: this.formBuilder.group({
        id: [this.endereco.cidade.id],
        nome: [this.endereco.cidade.nome],
        estado: this.formBuilder.group({
          idUf: [this.endereco.cidade.estado.id],
          sigla: [this.endereco.cidade.estado.sigla],
          nomeUf: [this.endereco.cidade.estado.nome]
        })
      })
    })
    
  }

  saida(){
    console.log('this.form', this.form)
    this.dialogRef.close(this.form.value);    
  }

  abort(){
    this.endereco.cidade.id = this.idCidadeAnt;
    this.dialogRef.close();
  }

}
