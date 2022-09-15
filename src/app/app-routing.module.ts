import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EnderecoCreateComponent } from './components/endereco/endereco-create/endereco-create.component';
import { EnderecoEditComponent } from './components/endereco/endereco-edit/endereco-edit.component';
import { HomeComponent } from './components/home/home.component';
import { InquililinoListComponent } from './components/inquilino/inquililino-list/inquililino-list.component';
import { InquilinoCreateComponent } from './components/inquilino/inquilino-create/inquilino-create.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'tecnico', component: TecnicoListComponent},
    {path: 'tecnico/create', component: TecnicoCreateComponent},
    {path: 'tecnico/update/:id', component: TecnicoUpdateComponent},
    {path: 'tecnico/delete/:id', component: TecnicoDeleteComponent},
    {path: 'inquilino', component: InquililinoListComponent},
    {path: 'inquilino/create', component: InquilinoCreateComponent},
    {path: 'inquilino/create/:id', component: InquilinoCreateComponent},
    {path: 'endereco/create', component: EnderecoCreateComponent},
    {path: 'endereco/edit/:id', component: EnderecoEditComponent},
    {path: 'proprietario', loadChildren: () => import('./components/proprietario/proprietario/proprietario.module')
    .then(m => m.ProprietarioModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
