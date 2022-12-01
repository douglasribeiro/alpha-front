import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inquilino } from 'src/app/models/inquilino';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { Telefone } from '../telefone';
import { TelefoneCreateComponent } from '../telefone-create/telefone-create.component';
import { TelefoneDeleteComponent } from '../telefone-delete/telefone-delete.component';
import { TelefoneEditComponent } from '../telefone-edit/telefone-edit.component';

@Component({
  selector: 'app-telefone-list',
  templateUrl: './telefone-list.component.html',
  styleUrls: ['../telefone.component.css']
})
export class TelefoneListComponent implements OnInit {

  @Input() public inq: Inquilino;
  nomeInquilino: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  ELEMENT_DATA: Telefone[] = []

  displayedColumns: string[] = ['id', 'ddd', 'numero', 'tipoTelefone', 'acoes'];
  dataSource = new MatTableDataSource<Telefone>(this.data.telefones);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.nomeInquilino = this.data.reg.nome;
    console.log("data.reg.telefones ", this.data.reg.telefones);
    this.ELEMENT_DATA = this.data.reg.telefones;
    this.dataSource = new MatTableDataSource<Telefone>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "80%";
    dialogConfig.data = { orderItemIndex, OrderID };
    if (OrderID){
      this.dialog.open(TelefoneEditComponent, dialogConfig).afterClosed().subscribe(res => {
        //console.log(res.data);
      })
    } else {
      this.dialog.open(TelefoneCreateComponent,dialogConfig).afterClosed().subscribe(res => {   
        console.log("inclusão de novo telefone.", res.data);      
        this.data.reg.telefones.push(res.data);
        this.ngOnInit();
      })
    }
  }

  excluiTelefone(orderItemIndex, OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "80%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(TelefoneDeleteComponent, dialogConfig).afterClosed().subscribe( res => {
      if(res){
        //console.log("Saida Delete ", res);
        //console.log("lista ", this.data.reg.enderecos);
        this.data.reg.telefones = this.data.reg.telefones.filter(h => h.id !== res.id)
        //console.log("lista removido ", this.data.reg.enderecos);
        this.ngOnInit();
      }
    });
  }
}