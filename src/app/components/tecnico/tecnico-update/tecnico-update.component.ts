import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, [Validators.required]);
  cpf: FormControl = new FormControl(null, [Validators.required]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  senha: FormControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
  cbAdmin: FormControl = new FormControl(null);
  cbClient: FormControl = new FormControl(null);
  cbTec: FormControl = new FormControl(null);

  // 3322-9270
  // adm@lladministracoes.com.br
  // isabele
  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  validaCampos(){
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha;
  }

  findById(): void {
    this.service.findbyId(this.tecnico.id).subscribe(resposta => {
      //resposta.perfis = [];
      this.tecnico = resposta;
      for(let p of this.tecnico.perfis){
        if( p == "TECNICO")
          this.cbTec.setValue(true);
        if( p == "ADMIN")
          this.cbAdmin.setValue(true);
        if( p == "CLIENTE")
          this.cbClient.setValue(true);
      }
    });
  }

  update() {
    this.tecnico.perfis = [];
    if(this.cbAdmin.value)  this.tecnico.perfis.push("0");
    if(this.cbClient.value) this.tecnico.perfis.push("1");
    if(this.cbTec.value)    this.tecnico.perfis.push("2");
    
    this.service.update(this.tecnico).subscribe(resposta => {
      this.toast.success('Tecnico atualizado com sucesso.', 'Update')
      this.router.navigate(['tecnico'])
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
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  buildPerfil(){

  }
}
