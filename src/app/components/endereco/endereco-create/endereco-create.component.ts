import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { distinctUntilChanged, switchMap, empty, tap } from 'rxjs';
import { Cep } from 'src/app/models/cep';
import { Cidade } from 'src/app/models/cidade';
import { Endereco } from 'src/app/models/endereco';
import { EstadoBR } from 'src/app/models/estadobr';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { TransitorioService } from 'src/app/services/transitorio.service';
import { FormValidation } from 'src/app/shared/form-validations';
import { EstadosCidadesService } from 'src/app/shared/services/estados-cidades.service';
import { EnderecoEditComponent } from '../endereco-edit/endereco-edit.component';

@Component({
  selector: 'app-endereco-create',
  templateUrl: './endereco-create.component.html',
  styleUrls: ['../endereco.component.css']
})
export class EnderecoCreateComponent implements OnInit {

  endereco: Endereco;
  cep: Cep;
  estados: EstadoBR[];
  cidades: Cidade[] = [];
  idCidadeAnt: any;
  form: FormGroup;

  tipoEnderecos: EstadoCivil[] = [
    {value: "RESIDENCIAL", viewValue: "Residencial"},
    {value: "COMERCIAL", viewValue: "Comercial"},
    {value: "COBRANÇA", viewValue: "Cobrança"},
    {value: "ENTREGA", viewValue: "Entrega"},
    {value: "RECADO", viewValue: "Recado"},
    {value: "OUTROS", viewValue: "Outros"}
  ]
  cepValidator: any | string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public estadoService: EstadosCidadesService,
    public transitorio: TransitorioService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnderecoEditComponent>
  ) {
    
   }

  ngOnInit(): void {
    this.endereco = this.data.OrderID;
    //this.idCidadeAnt = this.endereco.cidade.id;
    this.form = this.formBuilder.group({
      id:           [''],
      logradouro:   [''],
      numero:       [''],
	    complemento:  [''],
	    bairro:       [''],
	    cep:          ['',[Validators.required, FormValidation.cepValidator]],
	    tipoEndereco: [''],
	    cidade: this.formBuilder.group({
        id: [''],
        nome: [''],
        estado: this.formBuilder.group({
          idUf: [''],
          sigla: [''],
          nomeUf: [''],
        })
      })
    })
    
    this.estadoService.getEstados().subscribe(est => this.estados = est)
    this.form.get('cep').statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(value => console.log('status CEP.:', value)),
      switchMap(status => status === 'VALID' ? this.estadoService.consultaCEP(this.form.get('cep').value) : empty())
    )
    .subscribe(dados => {
      this.cep = dados;
      console.log("Viacep.: ", this.cep);
      this.form.get('logradouro').setValue(this.cep.logradouro);
      this.form.get('bairro').setValue(this.cep.bairro);
      this.form.get('complemento').setValue(this.cep.complemento);
      this.form.get('cidade.estado.sigla').setValue(this.cep.uf);
      this.form.get('cidade.estado.idUf').setValue(this.cep.idUf);
      this.form.get('cidade.nome').setValue(this.cep.localidade);
      this.form.get('cidade.estado.nomeUf').setValue(this.cep.nomeUf);
      this.form.get('cidade.id').setValue(this.cep.idCidade);
    });

    this.form.get('cidade.estado.sigla').valueChanges
      .pipe(
        tap(sigla => console.log('Novo estado.: ', sigla)),
        switchMap((estadoId: number) => this.estadoService.getCidades(estadoId)),
      )
      .subscribe(cidades => this.cidades = cidades);
  }

  saida(){
    console.log('this.form', this.form)
    this.dialogRef.close(this.form.value);    
  }

  abort(){
    this.dialogRef.close();
  }

}
