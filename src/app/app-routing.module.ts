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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'inquilino', component: InquililinoListComponent},
    {path: 'inquilino/create', component: InquilinoCreateComponent},
    {path: 'inquilino/create/:id', component: InquilinoCreateComponent},
    {path: 'endereco/create', component: EnderecoCreateComponent},
    {path: 'endereco/edit/:id', component: EnderecoEditComponent},
    {path: 'proprietario', loadChildren: () => import('./components/proprietario/proprietario.module')
    .then(m => m.ProprietarioModule)},
    {path: 'tecnico', loadChildren: () => import('./components/tecnico/tecnico.module')
    .then(m => m.TecnicoModule)},
    {path: 'admin', loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
