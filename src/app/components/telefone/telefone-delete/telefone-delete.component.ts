import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Telefone } from '../telefone';
import { TelefoneEditComponent } from '../telefone-edit/telefone-edit.component';

@Component({
  selector: 'app-telefone-delete',
  templateUrl: './telefone-delete.component.html',
  styleUrls: ['../telefone.component.css']
})
export class TelefoneDeleteComponent implements OnInit {

  telefone: Telefone;
  
  ddd:   FormControl = new FormControl(null);
	numero: FormControl = new FormControl(null);
	tipo:   FormControl = new FormControl(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TelefoneEditComponent>
  ) { }

  ngOnInit(): void {
    this.telefone = this.data.OrderID;
  }

  saida(){
    this.dialogRef.close(this.telefone);    
  }

  abort(){
    this.dialogRef.close();
  }

}
