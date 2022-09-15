import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-telefone-edit',
  templateUrl: './telefone-edit.component.html',
  styleUrls: ['../telefone.component.css']
})
export class TelefoneEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TelefoneEditComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
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
