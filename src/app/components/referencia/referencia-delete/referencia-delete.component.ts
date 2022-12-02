import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Referencia } from 'src/app/models/referencia';

@Component({
  selector: 'app-referencia-delete',
  templateUrl: './referencia-delete.component.html',
  styleUrls: ['../referencia.component.css']
})
export class ReferenciaDeleteComponent implements OnInit {

  form: FormGroup;
  referencia: Referencia;
  
  id: FormControl = new FormControl(null);
	nome: FormControl = new FormControl(null);
	email: FormControl = new FormControl(null);
  phone01: FormControl = new FormControl(null);
	phone02: FormControl = new FormControl(null);
	observacao: FormControl = new FormControl(null);
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReferenciaDeleteComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.referencia = this.data.OrderID;
  }

  saida(){
    console.log("this.referencia ", this.referencia);
    this.dialogRef.close({data: this.referencia});    
  }

  abort(){
    this.dialogRef.close();
  }

}
