import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inquilino } from 'src/app/models/inquilino';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { Telefone } from '../telefone';
import { TelefoneCreateComponent } from '../telefone-create/telefone-create.component';
import { TelefoneEditComponent } from '../telefone-edit/telefone-edit.component';

@Component({
  selector: 'app-telefone-list',
  templateUrl: './telefone-list.component.html',
  styleUrls: ['./telefone-list.component.css']
})
export class TelefoneListComponent implements OnInit {

  @Input() public inq: Inquilino;

  constructor(
    public dialog: MatDialog,
    //public transitorio: TransitorioService
  ){}
  ELEMENT_DATA: Telefone[] = []

  displayedColumns: string[] = ['id', 'ddd', 'numero', 'acoes'];
  dataSource = new MatTableDataSource<Telefone>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.ELEMENT_DATA = this.inq.telefones;
    this.dataSource = new MatTableDataSource<Telefone>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { orderItemIndex, OrderID };
    //console.log("entrada no dialog!", OrderID);
    if (OrderID) {
      this.dialog.open(TelefoneEditComponent, dialogConfig).afterClosed().subscribe( res => {
        if (res){
          console.log("retorno positivo (Telefone)!", res);
          var ocurs = this.inq.telefones.length;
          for (let i = 0; i < ocurs; i++){
            if(this.inq.telefones[i].id == res.id){
              this.inq.telefones[i].ddd = res.ddd;
              this.inq.telefones[i].numero = res.numero;
            }
          }
          this.ngOnInit();
        }
      })
    } else {
      this.dialog.open(TelefoneCreateComponent, dialogConfig).afterClosed().subscribe( res => {
        if (res){
          console.log("retorno positivo!", res);
          this.inq.telefones.push(res);
        }
      })
    }   
  }

}