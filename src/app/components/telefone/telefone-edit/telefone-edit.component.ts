import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TelefoneEditComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.telefone = this.data.OrderID;
    this.form = this.formBuilder.group({
      id:     [this.telefone.id],
      ddd:    [this.telefone.ddd],
      numero: [this.telefone.numero]
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
