import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Endereco } from 'src/app/models/endereco';
import { Inquilino } from 'src/app/models/inquilino';
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
    console.log("entrada no dialog!", OrderID);
    //if (OrderID) {
      this.dialog.open(EnderecoEditComponent, dialogConfig).afterClosed().subscribe( res => {
        if (res){
          console.log("retorno positivo!", res);
          var ocurs = this.inq.enderecos.length;
          for (let i = 0; i < ocurs; i++){
            if(this.inq.enderecos[i].id == res.id){
              this.inq.enderecos[i].cep = res.cep;
              this.inq.enderecos[i].logradouro = res.logradouro;
              this.inq.enderecos[i].numero = res.numero;
              this.inq.enderecos[i].tipoEndereco = res.tipoEndereco;
              this.inq.enderecos[i].bairro = res.bairro;
              this.inq.enderecos[i].cidade.estado.id = res.cidade.estado.id;
              this.inq.enderecos[i].cidade.estado.nome = res.cidade.estado.nome;
              this.inq.enderecos[i].cidade.estado.sigla = res.cidade.estado.sigla;
              this.inq.enderecos[i].cidade.id = res.cidade.id;
              this.inq.enderecos[i].cidade.nome = res.cidade.nome;
              this.inq.enderecos[i].complemento = res.complemento;
            }
          }
          
        }else{
          //console.log('Inq.enderecos ',this.inq.enderecos)
          //console.log('Enderecos', this.inq)
          console.log("retorno negativo!", res);
        }
      })
    //}
    
    
  }
  updateGrandTotal() {
    throw new Error('Method not implemented.');
  }

}