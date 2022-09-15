import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inquilino } from 'src/app/models/inquilino';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { Telefone } from '../telefone';
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
          console.log("retorno positivo!", res);
          /*
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
          }*/
        }
      })
    } else {
      this.dialog.open(TelefoneEditComponent, dialogConfig).afterClosed().subscribe( res => {
        if (res){
          console.log("retorno positivo!", res);
     /*     const novoEstado: EstadoBR = {
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
          this.ngOnInit();*/
        }
      })
    }   
  }

}