import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Imovel } from 'src/app/models/imovel';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-imovel-list',
  templateUrl: './imovel-list.component.html',
  styleUrls: ['./imovel-list.component.css']
})
export class ImovelListComponent implements OnInit {

  ELEMENT_DATA: Imovel[] = []

  displayedColumns: string[] = ['endereco', 'numero', 'proprietario', 'tipo', 'edificacao',  'servico', 'acoes'];
  dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ImovelService,
    public dialog: MatDialog,
    private toast: ToastrService,){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
