import { BaseEnum } from './../../../models/baseEnum';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Inquilino } from 'src/app/models/inquilino';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { EnderecoListComponent } from '../../endereco/endereco-list/endereco-list.component';
import { ReferenciaListComponent } from '../../referencia/referencia-list/referencia-list.component';
import { TelefoneListComponent } from '../../telefone/telefone-list/telefone-list.component';

@Component({
  selector: 'app-inquilino-create',
  templateUrl: './inquilino-create.component.html',
  styleUrls: ['./inquilino-create.component.css']
})
export class InquilinoCreateComponent implements OnInit {

  novo: boolean = false;
  address: boolean = false;
  phone: boolean = false;
  refer: boolean = false;
  formulario: boolean = true;
  selectedValue: string;
  pessoasOp: any[];

  estCivis: BaseEnum[] = [
    {value: 'SOLTEIRO', viewValue: 'Solteiro'},
    {value: 'CASADO', viewValue: 'Casado'},
    {value: 'AMAZIADO', viewValue: 'Amaziado'},
    {value: 'VIUVO', viewValue: 'Viuvo'}
  ]

  inquilino: Inquilino = {
    id: '',
    nome: '',
    cpfcnpj: '',
    email: '',
    pessoa: '',
    identinscr: '',
    dtNiver: '',
    estCivil: '',
    sexo: '',
    ativo: false,
    nacional: '',
    naturalidade: '',
    telefones: [],
    enderecos: [],
    referencias:[]
  }

  nome:         FormControl = new FormControl(null, [Validators.required]);
  cpfcnpj:      FormControl = new FormControl(null, [Validators.required]);
  email:        FormControl = new FormControl(null, [Validators.required, Validators.email]);
  identinscr:   FormControl = new FormControl(null);
  dtNiver:      FormControl = new FormControl(null);
  estCivil:     FormControl = new FormControl(null);
  sexo:         FormControl = new FormControl(null);
  ativo:        FormControl = new FormControl(null);
  nacional:     FormControl = new FormControl(null);
  naturalidade: FormControl = new FormControl(null);
  pessoa:       FormControl = new FormControl(null);

  constructor(
    private service: InquilinoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dropDownService: DropdownService,
    public dialog: MatDialog) { }



  ngOnInit(): void {
    this.pessoasOp = this.dropDownService.getPessoas();
    if(this.route.snapshot.paramMap.get('id') !== null){
      this.inquilino.id = this.route.snapshot.paramMap.get('id');
      this.findById();
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

  busca($event){
    let datePipe = new DatePipe("pt-BR");
    let data = datePipe.transform(new Date($event.value), "dd/MM/yyyy");
  }

  findById() :void{
    this.service.findbyId(this.inquilino.id).subscribe(resposta => {
      //console.log("Resposta: ", resposta);
      this.inquilino = resposta;
    });
  }

  validaCampos(){
    return this.nome.valid && this.cpfcnpj.valid && this.email.valid;
  }

  create() {
    if(!this.novo) {
      this.update()
    } else {
      this.service.create(this.inquilino).subscribe(resposta => {
        this.toast.success('Inquilino criado com sucesso.', 'Cadastro')
        this.router.navigate(['inquilino'])
      }, ex => {
        if(ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      })
    }
  }

  update(){
    this.service.update(this.inquilino).subscribe(resposta => {
      //console.log("Salvar ", this.inquilino);
      this.toast.success('Inquilino alterado com sucesso.', 'Cadastro')
      this.router.navigate(['inquilino'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfil(perfil: any): void {
    //if(this..perfis.includes(perfil)) {
    //  this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    //} else {
    //  this.tecnico.perfis.push(perfil);
    //}
  }

  dispAddress(): void {

    const reg = this.inquilino;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "80%";
    dialogConfig.data = { reg };
    this.dialog.open(EnderecoListComponent, dialogConfig).afterClosed().subscribe( res => {

    })

  }

  dispPhone(): void {
    const reg = this.inquilino;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "50%";
    dialogConfig.data = { reg };
    this.dialog.open(TelefoneListComponent, dialogConfig).afterClosed().subscribe( res => {
    })
  }

  dispRefer(): void {
    const reg = this.inquilino;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.maxHeight = "70%";
    dialogConfig.data = { reg };
    this.dialog.open(ReferenciaListComponent, dialogConfig).afterClosed().subscribe( res => {
      //console.log("Retorno ", res);
    })
  }

  openDialog(): void {

  }

}
