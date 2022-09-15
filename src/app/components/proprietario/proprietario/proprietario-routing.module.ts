import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProprietarioListComponent } from '../proprietario-list/proprietario-list.component';

const routes: Routes = [
  {path: '', component: ProprietarioListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietarioRoutingModule { }
