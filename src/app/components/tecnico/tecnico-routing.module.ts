import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicoCreateComponent } from './tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './tecnico-delete/tecnico-delete.component';
import { TecnicoListComponent } from './tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './tecnico-update/tecnico-update.component';

const routes: Routes = [
  {path: '', component: TecnicoListComponent},
  {path: 'tecnico/create', component: TecnicoCreateComponent},
  {path: 'tecnico/update/:id', component: TecnicoUpdateComponent},
  {path: 'tecnico/delete/:id', component: TecnicoDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TecnicoRoutingModule { }
