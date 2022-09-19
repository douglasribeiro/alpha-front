import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquilinoRoutingModule } from './inquilino-routing.module';
import { InquililinoListComponent } from './inquililino-list/inquililino-list.component';
import { InquilinoCreateComponent } from './inquilino-create/inquilino-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EnderecoCreateComponent } from '../endereco/endereco-create/endereco-create.component';
import { EnderecoDeleteComponent } from '../endereco/endereco-delete/endereco-delete.component';
import { EnderecoEditComponent } from '../endereco/endereco-edit/endereco-edit.component';
import { EnderecoListComponent } from '../endereco/endereco-list/endereco-list.component';
import { ReferenciaListComponent } from '../referencia/referencia-list/referencia-list.component';
import { TelefoneListComponent } from '../telefone/telefone-list/telefone-list.component';
import { TelefoneEditComponent } from '../telefone/telefone-edit/telefone-edit.component';
import { TelefoneCreateComponent } from '../telefone/telefone-create/telefone-create.component';
import { ReferenciaEditComponent } from '../referencia/referencia-edit/referencia-edit.component';
import { ReferenciaCreateComponent } from '../referencia/referencia-create/referencia-create.component';


@NgModule({
  declarations: [
    InquililinoListComponent,
    InquilinoCreateComponent,
    EnderecoListComponent,
    TelefoneListComponent,
    ReferenciaListComponent,
    EnderecoEditComponent,
    EnderecoCreateComponent,
    EnderecoDeleteComponent,
    TelefoneEditComponent,
    TelefoneCreateComponent,
    ReferenciaEditComponent,
    ReferenciaCreateComponent,
  ],
  imports: [
    CommonModule,
    InquilinoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InquilinoModule { }
