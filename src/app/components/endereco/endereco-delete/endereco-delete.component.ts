import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  
  cepValidator: any | string;
  logradouro:   FormControl = new FormControl(null);
	numero:       FormControl = new FormControl(null);
	complemento:  FormControl = new FormControl(null);
	bairro:       FormControl = new FormControl(null);
	cep:          FormControl = new FormControl(null);
	tipoEndereco: FormControl = new FormControl(null);
	inquilino:    FormControl = new FormControl(null);
	cidade:       FormControl = new FormControl(null);
  estado:       FormControl = new FormControl(null);
  
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
  }

  saida(){
    this.dialogRef.close(this.endereco);    
  }

  abort(){
    this.dialogRef.close();
  }

}
