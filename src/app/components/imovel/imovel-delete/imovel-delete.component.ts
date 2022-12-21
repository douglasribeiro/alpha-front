import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    @Inject(MAT_DIALOG_DATA) public imovel: Imovel,
    private router: Router,
    ) { }

    abort(): void {
      this.dialogo.close(false);
      this.router.navigate(['imovel']);
    }
    salvar(): void {
      this.dialogo.close(true);
      this.router.navigate(['imovel']);
    }

  ngOnInit() {
    console.log("Excluir: ", this.imovel);
  }

}
