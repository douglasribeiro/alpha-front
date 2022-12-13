import { BaseEnum } from './../../../models/baseEnum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Endereco } from 'src/app/models/endereco';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { TransitorioService } from 'src/app/services/transitorio.service';

@Component({
  selector: 'app-endereco-edit',
  templateUrl: './endereco-edit.component.html',
  styleUrls: ['../endereco.component.css']
})
export class EnderecoEditComponent implements OnInit {

  endereco: Endereco;
  idCidadeAnt: any;

  tipoEnderecos: BaseEnum[] = [
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "COBRANÇA", viewValue: "Cobrança"},
    {value: "ENTREGA", viewValue: "Entrega"},
    {value: "RECADO", viewValue: "Recado"},
    {value: "OUTROS", viewValue: "Outros"}
  ]
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
    public transitorio: TransitorioService,
    public dialogRef: MatDialogRef<EnderecoEditComponent>,
    public inquilinoService: InquilinoService
  ) {}

  ngOnInit(): void {
    this.endereco = this.data.OrderID;
  }

  abort(){
    this.dialogRef.close();
  }

  salvar(){
    console.log(this.endereco);
    this.dialogRef.close({data: this.endereco});
  }

  verCep(){
      this.inquilinoService.buscaCep(this.cep.value).subscribe(res => {
        this.logradouro.setValue(res.logradouro);
        this.bairro.setValue(res.bairro);
        this.complemento.setValue(res.complemento);
        this.cidade.setValue(res.localidade);
        this.estado.setValue(res.uf);
      });
  }
}
