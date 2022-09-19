import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Referencia } from 'src/app/models/referencia';


@Component({
  selector: 'app-referencia-create',
  templateUrl: './referencia-create.component.html',
  styleUrls: ['../referencia.component.css']
})
export class ReferenciaCreateComponent implements OnInit {

  form: FormGroup;
  referencia: Referencia;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReferenciaCreateComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.referencia = this.data.OrderID;
    this.form = this.formBuilder.group({
      id:        [''],
      nome:      [''],
      email:     [''],
      phone01:   [''],
      phone02:   [''],
      observacao:['']
    })
  }

  saida(){
    console.log('this.form', this.form)
    this.dialogRef.close(this.form.value);    
  }

  abort(){
    this.dialogRef.close();
  }

}
