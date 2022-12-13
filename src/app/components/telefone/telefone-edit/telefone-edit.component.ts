import { BaseEnum } from './../../../models/baseEnum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Telefone } from '../telefone';

@Component({
  selector: 'app-telefone-edit',
  templateUrl: './telefone-edit.component.html',
  styleUrls: ['../telefone.component.css']
})
export class TelefoneEditComponent implements OnInit {

  form: FormGroup;
  telefone: Telefone;

  tipoTelefones: BaseEnum[] = [
    {value: "PESSOAL", viewValue: "Pessoal"},
    {value: "RECADO", viewValue: "Recado"},
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "OUTROS", viewValue: "Outros"}
  ]

  ddd:    FormControl = new FormControl(null);
  mumero: FormControl = new FormControl(null);
  tipo: FormControl = new FormControl(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TelefoneEditComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.telefone = this.data.OrderID;
  }

  saida(){
    console.log('this.form', this.form)
    this.dialogRef.close({data: this.telefone});
  }

  abort(){
    this.dialogRef.close();
  }

}
