import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { Inquilino } from 'src/app/models/inquilino';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'app-inquilino-create',
  templateUrl: './inquilino-create.component.html',
  styleUrls: ['./inquilino-create.component.css']
})
export class InquilinoCreateComponent implements OnInit {

  address: boolean = false;
  phone: boolean = false;
  refer: boolean = false;
  formulario: boolean = true;
  selectedValue: string;
  pessoasOp: any[];

  estCivis: EstadoCivil[] = [
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
    enderecos: []
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
    private dropDownService: DropdownService) { }

  

  ngOnInit(): void {
    this.pessoasOp = this.dropDownService.getPessoas();
    if(this.route.snapshot.paramMap.get('id') !== null){
      this.inquilino.id = this.route.snapshot.paramMap.get('id');
      this.findById();
    }
  }

  busca($event){
    let datePipe = new DatePipe("pt-BR");
    let data = datePipe.transform(new Date($event.value), "dd/MM/yyyy");
  }

  findById() :void{
    this.service.findbyId(this.inquilino.id).subscribe(resposta => {
      this.inquilino = resposta;
    });
  }

  validaCampos(){
    return this.nome.valid && this.cpfcnpj.valid && this.email.valid;
  }

  create() {  
    this.service.create(this.inquilino).subscribe(resposta => {
      this.toast.success('Inquilino criado com sucesso.', 'Cadastro')
      this.router.navigate(['tecnicos'])
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
    if(this.address) {
      this.address = false;
    }
    else {
      this.address = true;
      this.phone = false;
      this.refer = false;
    }
  }

  dispPhone(): void {
    if(this.phone) {
      this.phone = false;
    }
    else {
      this.phone = true;
      this.address = false;
      this.refer = false;
    }
    
  }

  dispRefer(): void {
    if(this.refer){
      this.refer = false;
    }else{
      this.refer = true;
      this.address = false;
      this.phone = false;
    }
  }

}