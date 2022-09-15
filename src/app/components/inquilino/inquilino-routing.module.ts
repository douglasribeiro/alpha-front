import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecoCreateComponent } from '../endereco/endereco-create/endereco-create.component';
import { EnderecoEditComponent } from '../endereco/endereco-edit/endereco-edit.component';
import { InquililinoListComponent } from './inquililino-list/inquililino-list.component';
import { InquilinoCreateComponent } from './inquilino-create/inquilino-create.component';

const routes: Routes = [
  {path: '', component: InquililinoListComponent},
  {path: 'create', component: InquilinoCreateComponent},
  {path: 'create/:id', component: InquilinoCreateComponent},
  {path: 'endereco/create', component: EnderecoCreateComponent},
  {path: 'endereco/edit/:id', component: EnderecoEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquilinoRoutingModule { }
