import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inquilino } from 'src/app/models/inquilino';
import { Referencia } from 'src/app/models/referencia';
import { ReferenciaCreateComponent } from '../referencia-create/referencia-create.component';
import { ReferenciaEditComponent } from '../referencia-edit/referencia-edit.component';

@Component({
  selector: 'app-referencia-list',
  templateUrl: './referencia-list.component.html',
  styleUrls: ['./referencia-list.component.css']
})
export class ReferenciaListComponent implements OnInit {

  @Input() public inq: Inquilino;
  
  constructor(
    public dialog: MatDialog,
    ) { }
  ELEMENT_DATA: Referencia[] = []

  displayedColumns: string[] = ['id', 'nome', 'email', 'phone01', 'phone02', 'acoes'];
  dataSource = new MatTableDataSource<Referencia>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.ELEMENT_DATA = this.inq.referencias;
    this.dataSource = new MatTableDataSource<Referencia>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  excluiReferencia(orderItemIndex, OrderID){
    /*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(EnderecoDeleteComponent, dialogConfig).afterClosed().subscribe( res => {
      if(res){
        //console.log("eclusão confirmada.........", this.inq.enderecos);
        let enderecosSalvos: Endereco[] = [];
        for (let i = 0; i < this.inq.enderecos.length; i++){
          if(this.inq.enderecos[i].id != res.id)
            enderecosSalvos.push(this.inq.enderecos[i])
        }
       // console.log("lista final.........", enderecosSalvos);
        this.inq.enderecos = enderecosSalvos;
        this.ngOnInit();
      }
    });
    */
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { orderItemIndex, OrderID };
    console.log("entrada no dialog!", OrderID);
    if (OrderID) {
      this.dialog.open(ReferenciaEditComponent, dialogConfig).afterClosed().subscribe( res => {
        if (res){
          console.log("retorno positivo!", res);          
          var ocurs = this.inq.referencias.length;
          for (let i = 0; i < ocurs; i++){
            if(this.inq.referencias[i].id == res.id){
              this.inq.referencias[i].nome = res.nome;
              this.inq.referencias[i].email = res.email;
              this.inq.referencias[i].phone01 = res.phone01;
              this.inq.referencias[i].phone02 = res.phone02;
              this.inq.referencias[i].observacao = res.observacao;
              this.inq.referencias[i].inquilino = res.inquilino;
            }
          }
        }
      })
    } else {
      this.dialog.open(ReferenciaCreateComponent, dialogConfig).afterClosed().subscribe( res => {
        if (res){
          console.log("retorno positivo!", res);
          this.inq.referencias.push(res);
          };
          
          //console.log('Novo Endereço ', this.inq.enderecos);
          this.ngOnInit();
      }
    )}
    
  }

  updateGrandTotal() {
    throw new Error('Method not implemented.');
  }

}