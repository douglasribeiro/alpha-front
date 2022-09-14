import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cidade } from 'src/app/models/cidade';
import { Endereco } from 'src/app/models/endereco';
import { EstadoBR } from 'src/app/models/estadobr';
import { Inquilino } from 'src/app/models/inquilino';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { EnderecoCreateComponent } from '../endereco-create/endereco-create.component';
import { EnderecoDeleteComponent } from '../endereco-delete/endereco-delete.component';
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

  excluiEndereco(orderItemIndex, OrderID){
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
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { orderItemIndex, OrderID };
    //console.log("entrada no dialog!", OrderID);
    if (OrderID) {
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
        }
      })
    } else {
      this.dialog.open(EnderecoCreateComponent, dialogConfig).afterClosed().subscribe( res => {
        if (res){
          console.log("retorno positivo!", res);
          const novoEstado: EstadoBR = {
            id: res.cidade.estado.idUf,
            sigla: res.cidade.estado.sigla,
            nome: res.cidade.estado.nomeUf
          }
          const novaCidade: Cidade = {
            id: res.cidade.id,
            nome: res.cidade.nome,
            estado: novoEstado
          }
          const novoEndereco: Endereco = {
            logradouro: res.logradouro,
            numero: res.numero,
            complemento: res.complemento,
            bairro: res.bairro,
            cep: res.cep,
            tipoEndereco: res.tipoEndereco,
            cidade: novaCidade,
            inquilino: this.inq.id
          };
          this.inq.enderecos.push(novoEndereco)
          console.log('Novo Endereço ', this.inq.enderecos);
          this.ngOnInit();
        }
      })
    }
    
    
  }
  updateGrandTotal() {
    throw new Error('Method not implemented.');
  }

}