import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Referencia } from 'src/app/models/referencia';


@Component({
  selector: 'app-referencia-create',
  templateUrl: './referencia-create.component.html',
  styleUrls: ['../referencia.component.css']
})
export class ReferenciaCreateComponent implements OnInit {

  referencia: Referencia = {
    id: 0,
    nome: '',
    email: '',
    phone01: '',
    phone02: '',
    observacao: '',
    inquilino: undefined
  };

  id: FormControl = new FormControl('');
	nome: FormControl = new FormControl('');
	email: FormControl = new FormControl('');
  phone01: FormControl = new FormControl('');
	phone02: FormControl = new FormControl('');
	observacao: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReferenciaCreateComponent>,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
  }

  saida(){
    this.dialogRef.close({data: this.referencia});
  }

  abort(){
    this.dialogRef.close();
  }

}
