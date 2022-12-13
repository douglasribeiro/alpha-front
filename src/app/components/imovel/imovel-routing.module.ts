import { ImovelCreateComponent } from './imovel-create/imovel-create.component';
import { ImovelListComponent } from './imovel-list/imovel-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {path: '', component: ImovelListComponent},
  {path: 'create', component: ImovelCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ImovelRoutingModule{}
