import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Inquilino } from 'src/app/models/inquilino';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { InquilinoDeleteComponent } from '../inquilino-delete/inquilino-delete.component';

@Component({
  selector: 'app-inquililino-list',
  templateUrl: './inquililino-list.component.html',
  styleUrls: ['./inquililino-list.component.css']
})
export class InquililinoListComponent implements OnInit {

  ELEMENT_DATA: Inquilino[] = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Inquilino>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: InquilinoService,
    public dialog: MatDialog,
    private toast: ToastrService,){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Inquilino>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  excluiInquilino(id: any, nome: any){
    this.dialog.open(InquilinoDeleteComponent, { data: nome}).afterClosed().subscribe((confirmado: Boolean) => {
      if(confirmado){
        this.service.exclui(id).subscribe(res => {
          this.toast.success('Inquilino excluido com sucesso.', 'Cadastro');
          this.ngOnInit();
        });
      }else{
        this.toast.info('Operação de exclusão abortada!', 'Cadastro');
      }
    })
  }

}