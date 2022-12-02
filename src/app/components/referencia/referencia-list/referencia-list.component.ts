import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inquilino } from 'src/app/models/inquilino';
import { Referencia } from 'src/app/models/referencia';
import { ReferenciaCreateComponent } from '../referencia-create/referencia-create.component';
import { ReferenciaDeleteComponent } from '../referencia-delete/referencia-delete.component';
import { ReferenciaEditComponent } from '../referencia-edit/referencia-edit.component';

@Component({
  selector: 'app-referencia-list',
  templateUrl: './referencia-list.component.html',
  styleUrls: ['./referencia-list.component.css']
})
export class ReferenciaListComponent implements OnInit {

  @Input() public inq: Inquilino;
  nomeInquilino: string;
  
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ELEMENT_DATA: Referencia[] = []

  displayedColumns: string[] = ['id', 'nome', 'email', 'phone01', 'phone02', 'acoes'];
  dataSource = new MatTableDataSource<Referencia>(this.data.referencias);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
     this.nomeInquilino = this.data.reg.nome;
     this.ELEMENT_DATA = this.data.reg.referencias;
     this.dataSource = new MatTableDataSource<Referencia>(this.ELEMENT_DATA);
     this.dataSource.paginator = this.paginator;
  }

  excluiReferencia(orderItemIndex, OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "80%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(ReferenciaDeleteComponent, dialogConfig).afterClosed().subscribe( res => {
      if(res){
        this.data.reg.referencias = this.data.reg.referencias.filter(h => h.id !== res.data.id)
        this.ngOnInit();
      }
    })
  }
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
  //}

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { orderItemIndex, OrderID };
    if (OrderID) {
      this.dialog.open(ReferenciaEditComponent, dialogConfig).afterClosed().subscribe( res => {
      })
    } else {
      this.dialog.open(ReferenciaCreateComponent, dialogConfig).afterClosed().subscribe( res => {
        this.data.reg.referencias.push(res.data);
        this.ngOnInit();
      }
    )}
    
  }

  updateGrandTotal() {
    throw new Error('Method not implemented.');
  }

}