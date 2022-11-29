import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Endereco } from 'src/app/models/endereco';
import { Inquilino } from 'src/app/models/inquilino';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { EnderecoCreateComponent } from '../endereco-create/endereco-create.component';
import { EnderecoDeleteComponent } from '../endereco-delete/endereco-delete.component';
import { EnderecoEditComponent } from '../endereco-edit/endereco-edit.component';

@Component({
  selector: 'app-endereco-list',
  templateUrl: './endereco-list.component.html',
  styleUrls: ['../endereco.component.css']
})
export class EnderecoListComponent implements OnInit {

  @Input() public inq: Inquilino;
  endList: boolean = true;
  nomeInquilino: string;
  
  constructor(
    public dialog: MatDialog,
    public transitorio: TransitorioService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ELEMENT_DATA: Endereco[] = []

  displayedColumns: string[] = ['id', 'logradouro', 'numero', 'cep', 'tipo', 'acoes'];
  dataSource = new MatTableDataSource<Endereco>(this.data.enderecos);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.nomeInquilino = this.data.reg.nome;
    this.ELEMENT_DATA = this.data.reg.enderecos;
    this.dataSource = new MatTableDataSource<Endereco>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }

  excluiEndereco(orderItemIndex, OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "80%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(EnderecoDeleteComponent, dialogConfig).afterClosed().subscribe( res => {
      if(res){
        //console.log("Saida Delete ", res);
        //console.log("lista ", this.data.reg.enderecos);
        this.data.reg.enderecos = this.data.reg.enderecos.filter(h => h.id !== res.id)
        //console.log("lista removido ", this.data.reg.enderecos);
        this.ngOnInit();
      }
    });
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "80%";
    dialogConfig.data = { orderItemIndex, OrderID };
    if (OrderID){
      this.dialog.open(EnderecoEditComponent, dialogConfig).afterClosed().subscribe(res => {
        //console.log(res.data);
      })
    } else {
      this.dialog.open(EnderecoCreateComponent,dialogConfig).afterClosed().subscribe(res => {        
        this.data.reg.enderecos.push(res.data);
        this.ngOnInit();
      })
    }
  }
  //  if (OrderID) {
  //    this.dialog.open(EnderecoEditComponent, dialogConfig).afterClosed().subscribe( res => {
  //   )}}        //this.dialog.open(EnderecoCreateComponent, dialogConfig).afterClosed().subscribe( res => {
  //  }
    //     if (res){
    //       console.log("retorno positivo!", res);
    //       const novoEstado: EstadoBR = {
    //         id: res.cidade.estado.idUf,
    //         sigla: res.cidade.estado.sigla,
    //         nome: res.cidade.estado.nomeUf
    //       }
    //       const novaCidade: Cidade = {
    //         id: res.cidade.id,
    //         nome: res.cidade.nome,
    //         estado: novoEstado
    //       }
    //       const novoEndereco: Endereco = {
    //         logradouro: res.logradouro,
    //         numero: res.numero,
    //         complemento: res.complemento,
    //         bairro: res.bairro,
    //         cep: res.cep,
    //         tipoEndereco: res.tipoEndereco,
    //         cidade: novaCidade,
    //         inquilino: this.inq.id
    //       };
    //       this.inq.enderecos.push(novoEndereco)
    //       console.log('Novo Endereço ', this.inq.enderecos);
    //       this.ngOnInit();
    //     }
    //  })
    //}
    
    
 
  updateGrandTotal() {
    throw new Error('Method not implemented.');
  }

}