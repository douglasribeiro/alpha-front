import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ReferenciaCreateComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.referencia = this.data.OrderID;
    this.form = this.formBuilder.group({
      id:        [this.referencia.id],
      nome:      [this.referencia.nome],
      email:     [this.referencia.email],
      phone01:   [this.referencia.phone01],
      phone02:   [this.referencia.phone02],
      observacao:[this.referencia.observacao]
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
