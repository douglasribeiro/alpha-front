import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Endereco } from 'src/app/models/endereco';
import { Imovel } from 'src/app/models/imovel';
import { Proprietario } from 'src/app/models/proprietario';
import { ImovelService } from 'src/app/services/imovel.service';
import { InquilinoService } from 'src/app/services/inquilino.service';
import { ProprietarioService } from 'src/app/services/proprietario.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'app-imovel-edit',
  templateUrl: './imovel-edit.component.html',
  styleUrls: ['./imovel-edit.component.css']
})
export class ImovelEditComponent implements OnInit {

  novo: boolean = false;
  tpEdificacao: any[];
  tpServico: any[];
  tpImovel: any[];
  simNao: any[];
  formulario: boolean = true;
  pessoasOp: any[];
  estCivi: any[];

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

  matricula:      FormControl = new FormControl(null);
  complementoImovel:    FormControl = new FormControl(null);
  condominio:     FormControl = new FormControl(null);
  tipo:           FormControl = new FormControl(null);
  edificacao:     FormControl = new FormControl(null);
  servico:        FormControl = new FormControl(null);
  areaTotal:      FormControl = new FormControl(null);
  areaConstruida: FormControl = new FormControl(null);
  banheiros:      FormControl = new FormControl(null);
  quartos:        FormControl = new FormControl(null);
  suites:         FormControl = new FormControl(null);
  comodos:        FormControl = new FormControl(null);
  vagas:          FormControl = new FormControl(null);
  observacao:     FormControl = new FormControl(null);

  logradouro:   FormControl = new FormControl(null);
	numero:       FormControl = new FormControl(null);
	complementoEndereco: FormControl = new FormControl(null);
	bairro:       FormControl = new FormControl(null);
	cep:          FormControl = new FormControl(null);
	tipoEndereco: FormControl = new FormControl(null);
	inquilino:    FormControl = new FormControl(null);
	cidade:       FormControl = new FormControl(null);
  estado:       FormControl = new FormControl(null);

  id:           FormControl = new FormControl(null);
  nome:         FormControl = new FormControl(null);
  pessoa:       FormControl = new FormControl(null);
  cpfcnpj:      FormControl = new FormControl(null);
  identinscr:   FormControl = new FormControl(null);
  email:        FormControl = new FormControl(null);
  dtNiver:      FormControl = new FormControl(null);
  estCivil:     FormControl = new FormControl(null);
  sexo:         FormControl = new FormControl(null);
  ativo:        FormControl = new FormControl(null);
  nacional:     FormControl = new FormControl(null);
  naturalidade: FormControl = new FormControl(null);

  inquilinoService: any;

  constructor(
    private proprietarioService: ProprietarioService,
    private cepService: InquilinoService,
    private service: ImovelService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dropDownService: DropdownService,
    public dialog: MatDialog) {}

    ngOnInit(): void {
      this.tpEdificacao = this.dropDownService.getTipoEdificacao();
      this.tpImovel = this.dropDownService.getTipoImovel();
      this.tpServico = this.dropDownService.getTipoServico();
      this.simNao = this.dropDownService.getSimNao();
      this.pessoasOp = this.dropDownService.getPessoas();
      this.estCivi = this.dropDownService.getEstCivis();
      if(this.route.snapshot.paramMap.get('id') !== null){
        this.imovel.id = this.route.snapshot.paramMap.get('id');
        this.findById();
        this.novo = false;
      }else{
        this.novo = true;
      }
    }

    findById() :void{
      this.service.findbyId(this.imovel.id).subscribe(resposta => {
        this.imovel = resposta;
      });                                           //  proprietarios
    }

    verCep(){
      this.cepService.buscaCep(this.cep.value).subscribe(res => {
        this.logradouro.setValue(res.logradouro);
        this.bairro.setValue(res.bairro);
        //this.complemento.setValue(res.complemento);
        this.cidade.setValue(res.localidade);
        this.estado.setValue(res.uf);
      })
    }

    busca($event){
      let datePipe = new DatePipe("pt-BR");
      let data = datePipe.transform(new Date($event.value), "dd/MM/yyyy");
    }

    pesquisaProprietario(){
      this.proprietarioService.findbyId(this.id.value).subscribe(res => {
        this.cargaProprietario(res);
      }, ex => {
        this.toast.error("Proprietario " + this.proprietario.id + " não cadastrado. ");
        this.proprietario.id = '';
      })
    }

    pesquisaProp(){
      if (this.proprietario.nome){
        this.proprietarioService.findGenerics(this.proprietario.nome).subscribe(res =>{
          this.cargaProprietario(res);
        });
      } else if(this.proprietario.email){
        this.proprietarioService.findGenerics(this.proprietario.email).subscribe(res =>{
          this.cargaProprietario(res);
        });
      } else {
        this.toast.info("Proprietario não informado. ");
      }

    }

    cargaProprietario(prop: Proprietario){
      this.proprietario.id = prop.id;
      this.proprietario.nome = prop.nome;
      this.proprietario.cpfcnpj = prop.cpfcnpj;
      this.proprietario.identinscr = prop.identinscr;
      this.proprietario.email = prop.email;
      this.proprietario.dtNiver = prop.dtNiver;
      this.proprietario.estCivil = prop.estCivil;
      this.proprietario.naturalidade = prop.naturalidade;
      this.proprietario.nacional = prop.nacional;
      this.proprietario.sexo = prop.sexo;
      this.proprietario.pessoa = prop.pessoa;
    }

    update(){
      console.log("Update ", this.imovel);
      this.service.update(this.imovel.id, this.imovel).subscribe(res => {
        this.toast.success("Imovel alterado com sucesso. ");
      }, ex => {
        this.toast.error("Erro ao alterar o registro. ");
      } );
    }

    unchange(){
      return false;
    }
}
