import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { TipoTelefone } from 'src/app/models/tipoTelefone';
import { Telefone } from '../telefone';

@Component({
  selector: 'app-telefone-create',
  templateUrl: './telefone-create.component.html',
  styleUrls: ['../telefone.component.css']
})
export class TelefoneCreateComponent implements OnInit {


  telefone: Telefone = {
    ddd: '',
    numero: '',
    id: 0,
    tipo: TipoTelefone.RECADO
  };

  tipoTelefones: EstadoCivil[] = [
    {value: "PESSOAL", viewValue: "Pessoal"},
    {value: "RECADO", viewValue: "Recado"},
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "OUTROS", viewValue: "Outros"}
  ]

  ddd:          FormControl = new FormControl('');
  mumero:       FormControl = new FormControl('');
  tipo: FormControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TelefoneCreateComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    
  }

  saida(){
    this.dialogRef.close({data: this.telefone});   
  }

  abort(){
    this.dialogRef.close();
  }

}
