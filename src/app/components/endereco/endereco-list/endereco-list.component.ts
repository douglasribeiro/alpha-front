import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Endereco } from 'src/app/models/endereco';
import { Inquilino } from 'src/app/models/inquilino';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { EnderecoEditComponent } from '../endereco-edit/endereco-edit.component';

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.css']
})
export class EnderecoListComponent implements OnInit {

  @Input() public inq: Inquilino;
  endList: boolean = true;
  endereco: Endereco;
  

  constructor(
    public dialog: MatDialog,
    public transitorio: TransitorioService) { }
  ELEMENT_DATA: Endereco[] = []

  displayedColumns: string[] = ['id', 'logradouro', 'numero', 'cep', 'tipo', 'acoes'];
  dataSource = new MatTableDataSource<Endereco>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.ELEMENT_DATA = this.inq.enderecos;
    this.dataSource = new MatTableDataSource<Endereco>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(EnderecoEditComponent, dialogConfig).afterClosed().subscribe( res => {
      console.log("Retorno Dialog!");
      console.log(res);
    });
    
  }
  updateGrandTotal() {
    throw new Error('Method not implemented.');
  }
}