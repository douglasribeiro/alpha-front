import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoCreateComponent } from '../endereco/endereco-create/endereco-create.component';
import { EnderecoEditComponent } from '../endereco/endereco-edit/endereco-edit.component';
import { ReferenciaListComponent } from '../referencia/referencia-list/referencia-list.component';
import { TelefoneEditComponent } from '../telefone/telefone-edit/telefone-edit.component';
import { TelefoneListComponent } from '../telefone/telefone-list/telefone-list.component';
import { InquililinoListComponent } from './inquililino-list/inquililino-list.component';
import { InquilinoCreateComponent } from './inquilino-create/inquilino-create.component';

const routes: Routes = [
  {path: '', component: InquililinoListComponent},
  {path: 'create', component: InquilinoCreateComponent},
  {path: 'create/:id', component: InquilinoCreateComponent},
  {path: 'endereco/create', component: EnderecoCreateComponent},
  {path: 'endereco/edit/:id', component: EnderecoEditComponent},
  {path: 'telefone/create', component: TelefoneListComponent},
  {path: 'telefone/edit/:id', component: TelefoneEditComponent},
  {path: 'referencia/list', component: ReferenciaListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquilinoRoutingModule { }
