import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Telefone } from '../telefone';

@Component({
  selector: 'app-telefone-create',
  templateUrl: './telefone-create.component.html',
  styleUrls: ['../telefone.component.css']
})
export class TelefoneCreateComponent implements OnInit {

  form: FormGroup;
  telefone: Telefone;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TelefoneCreateComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.telefone = this.data.OrderID;
    this.form = this.formBuilder.group({
      id:     [''],
      ddd:    [''],
      numero: ['']
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
