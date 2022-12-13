import { BaseEnum } from './../../../models/baseEnum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Endereco } from 'src/app/models/endereco';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { EnderecoEditComponent } from '../endereco-edit/endereco-edit.component';

@Component({
  selector: 'app-endereco-create',
  templateUrl: './endereco-create.component.html',
  styleUrls: ['../endereco.component.css']
})

export class EnderecoCreateComponent implements OnInit {

  endereco: Endereco = {
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    tipoEndereco: null,
    inquilino: null,
    cidade: '',
    estado: '',
  }

  tipoEnderecos: BaseEnum[] = [
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "COBRANÇA", viewValue: "Cobrança"},
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
	cidade:       FormControl = new FormControl(null);
  estado:       FormControl = new FormControl(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public inquilinoService: InquilinoService,
    public dialogRef: MatDialogRef<EnderecoEditComponent>
  ) {

   }

  ngOnInit(): void {

  }

  salva(){
    this.dialogRef.close({data: this.endereco});
  }

  abort(){
    this.dialogRef.close();
  }

  verCep(){
    this.inquilinoService.buscaCep(this.cep.value).subscribe(res => {
      this.logradouro.setValue(res.logradouro);
      this.bairro.setValue(res.bairro);
      this.complemento.setValue(res.complemento);
      this.cidade.setValue(res.localidade);
      this.estado.setValue(res.uf);
    })
  }

}
