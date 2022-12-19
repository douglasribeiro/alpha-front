import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Imovel } from 'src/app/models/imovel';

@Component({
  selector: 'app-imovel-delete',
  templateUrl: './imovel-delete.component.html',
  styleUrls: ['./imovel-delete.component.css']
})
export class ImovelDeleteComponent implements OnInit {

  //@Input() public imovel: Imovel;

  constructor(
    public dialogo: MatDialogRef<ImovelDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public imovel: Imovel
    ) { }

    abort(): void {
      this.dialogo.close(false);
    }
    salvar(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
    console.log("Excluir: ", this.imovel);
  }

}
