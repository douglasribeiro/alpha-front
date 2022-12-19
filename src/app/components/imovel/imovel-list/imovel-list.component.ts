import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Imovel } from 'src/app/models/imovel';
import { Proprietario } from 'src/app/models/proprietario';
import { ImovelService } from 'src/app/services/imovel.service';
import { ImovelDeleteComponent } from '../imovel-delete/imovel-delete.component';

@Component({
  selector: 'app-imovel-list',
  templateUrl: './imovel-list.component.html',
  styleUrls: ['./imovel-list.component.css']
})
export class ImovelListComponent implements OnInit {

  ELEMENT_DATA: Imovel[] = []

  proprietario: Proprietario = {
    nome: '',
    pessoa: '',
    cpfcnpj: '',
    identinscr: '',
    email: '',
    dtNiver: '',
    estCivil: '',
    sexo: '',
    ativo: true,
    nacional: '',
    naturalidade: '',
    id: ''
  }

  imovel: Imovel = {
    id: '',
    logradouro: '',
    numero: '',
    nomProrpietario: '',
    matricula: '',
    complementoImovel: '',
    condominio: '',
    tipo: '',
    edificacao: '',
    servico: '',
    areaTotal: '',
    areaConstruida: '',
    banheiros: '',
    quartos: '',
    suites: '',
    comodos: '',
    vagas: '',
    observacao: '',
    fotos: [],
    proprietario: this.proprietario,
    complementoEndereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: ''
  }

  displayedColumns: string[] = ['endereco', 'numero', 'proprietario', 'tipo', 'edificacao',  'servico', 'acoes'];
  dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ImovelService,
    public dialog: MatDialog,
    private toast: ToastrService
  ){}

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

  excluiImovel(id:any){
    this.service.findbyId(id).subscribe( x => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      dialogConfig.height = "70%";
      dialogConfig.data =  x ;
      this.dialog.open(ImovelDeleteComponent, dialogConfig).afterClosed().subscribe((confirmado: Boolean) => {
        if(confirmado){
          this.service.delete(id).subscribe(res => {
            this.toast.success('Imovel excluido com sucesso.', 'Cadastro');
            this.ngOnInit();
          });
        }else{
          this.toast.info('Operação de exclusão abortada!', 'Cadastro');
        }
      })
    });

  }

}
