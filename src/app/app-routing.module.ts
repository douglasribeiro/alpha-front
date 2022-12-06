import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    {path: 'home', component: HomeComponent},
    {path: 'proprietario', loadChildren: () => import('./components/proprietario/proprietario.module')
    .then(m => m.ProprietarioModule)},
    {path: 'tecnico', loadChildren: () => import('./components/tecnico/tecnico.module')
    .then(m => m.TecnicoModule)},
    {path: 'admin', loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule)},
    {path: 'inquilino', loadChildren: () => import('./components/inquilino/inquilino.module')
    .then(m => m.InquilinoModule)},
    {path: 'imovel', loadChildren: () => import('./components/imovel/imovel.module')
    .then(m => m.ImovelModule)}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
