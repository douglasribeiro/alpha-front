import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Referencia } from 'src/app/models/referencia';
import { ReferenciaCreateComponent } from '../referencia-create/referencia-create.component';

@Component({
  selector: 'app-referencia-edit',
  templateUrl: './referencia-edit.component.html',
  styleUrls: ['../referencia.component.css']
})
export class ReferenciaEditComponent implements OnInit {

  form: FormGroup;
  referencia: Referencia;
  referencia2: Referencia = {} as Referencia;

  id: FormControl = new FormControl(null);
	nome: FormControl = new FormControl(null);
	email: FormControl = new FormControl(null);
  phone01: FormControl = new FormControl(null);
	phone02: FormControl = new FormControl(null);
	observacao: FormControl = new FormControl(null);
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReferenciaEditComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.referencia = this.data.OrderID;
    this.referencia2.email = this.referencia.email;
    this.referencia2.id = this.referencia.id;
    this.referencia2.inquilino = this.referencia.inquilino;
    this.referencia2.nome = this.referencia.nome;
    this.referencia2.observacao = this.referencia.observacao;
    this.referencia2.phone01 = this.referencia.phone01;
    this.referencia2.phone02 = this.referencia.phone02;
  }

  saida(){
    this.referencia.email = this.referencia2.email;
    this.referencia.id = this.referencia2.id;
    this.referencia.inquilino = this.referencia2.inquilino;
    this.referencia.nome = this.referencia2.nome;
    this.referencia.observacao = this.referencia2.observacao;
    this.referencia.phone01 = this.referencia2.phone01;
    this.referencia.phone02 = this.referencia2.phone02;
    this.dialogRef.close({data: this.referencia});    
  }

  abort(){
    this.dialogRef.close();
  }

}
